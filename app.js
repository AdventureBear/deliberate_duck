//includes
var LocalStrategy = require("passport-local"),
    methodOverride = require('method-override'),
    bodyParser  = require('body-parser'),
    passport = require("passport"),
    mongoose  = require('mongoose'),
    express   = require('express'),
    seedDB    = require('./seed'),
    flash     = require('connect-flash'),
    dotenv    = require('dotenv'),
    morgan = require('morgan'),
    app       = express()

//models
var Story =     require('./models/story'),
    Project =   require('./models/project'),
    User    =   require('./models/user')


// route includes
var   userRoutes = require('./routes/users'),
      authRoutes = require('./routes/auth'),
      projectRoutes = require('./routes/projects'),
      storyRoutes   = require('./routes/stories')


//Connect to app
dotenv.config()
var mongo_url = process.env.DATABASE_URI
mongoose.connect(mongo_url)

app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static(__dirname + "/public"))
app.use(methodOverride("_method"))
app.use(morgan('dev'))
app.use(flash())
app.set("view engine", "ejs")
app.locals.moment = require('moment');

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
  //console.log("Current User: " + req.user)
  res.locals.currentUser = req.user;
  res.locals.error = req.flash("error")
  res.locals.success = req.flash("success")
  next();
});

// Route setup
app.use("/users", userRoutes)
app.use(authRoutes)
app.use("/projects", projectRoutes)
app.use("/projects/:id/stories", storyRoutes)




app.get("/", function(req,res){
  res.render("landing")
})

exports.closeServer = function(){
  server.close();
}

//SERVER
var port = process.env.PORT



var server = app.listen(port, function(req, res){
  console.log("User stories server is running on port ", port)
})

