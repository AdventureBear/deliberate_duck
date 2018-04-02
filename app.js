//includes
var passportLocalMongoose = require("passport-local-mongoose"),
    LocalStrategy = require("passport-local"),
    methodOverride = require('method-override'),
    bodyParser  = require('body-parser'),
    passport = require("passport"),
    mongoose  = require('mongoose'),
    express   = require('express'),
    seedDB    = require('./seed'),
    app       = express()



//models
var Story =     require('./models/story'),
    Project =   require('./models/project'),
    User    =   require('./models/user')

// route includes

var storyRoutes = require('./routes/stories'),
    projectRoutes = require('./routes/projects'),
    userRoutes = require('./routes/users')


// Route setup

app.use("/projects/:id/stories", storyRoutes)
app.use("/projects", projectRoutes)
app.use("/users", userRoutes)


//Connect to app
mongoose.connect("mongodb://localhost/user_stories")
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static(__dirname + "/public"))
app.use(methodOverride("_method"))
app.set("view engine", "ejs")
seedDB()

//setup passport
app.use(require("express-session")({
  secret: "Fig is the best puppy ever",
  resave: false,
  saveUninitialized: false
}))


app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
  console.log("Current User: " + req.user)
  res.locals.currentUser = req.user;
  next();
});


app.get("/", function(req,res){
  console.log("Index page")
  //console.log(req.body)
  res.render("index")
})


//========================================

//Authentication Routes
//show signup form
app.get('/register', function(req,res){
  res.render("register")
})


//user signup
app.post("/register", function(req,res){
  //res.send("Signing you up")
  console.log(req.body)
  var newUser = new User({username: req.body.username})
  User.register(newUser, req.body.password, function(err, user){
    if(err) {
      console.log(err);
      return res.render('register')
    } else {
      passport.authenticate("local")(req,res, function(){
        console.log("Created new user")
        res.redirect("/projects")
      })
    }
  })
})

//LOGIN ROUTES
//render login form
app.get("/login", function(req,res){
  res.render("login")
})

app.post("/login", passport.authenticate("local",
  {
    successRedirect: "/projects",
    failureRedirect: "/login"
  }), function(req,res) {
  // console.log("Logged in" +currentUser)
  // res.redirect("/projects")
})

//Logout Routes
app.get("/logout", function(req,res) {
  req.logout()
  res.redirect("/projects")
})


//==================================================


function isLoggedIn(req, res, next){
  if(req.isAuthenticated()){
    return next()
  }
  res.redirect("/login")
}
//SERVER
app.listen(3001, function(req, res){
  console.log("User stories server is running")
})