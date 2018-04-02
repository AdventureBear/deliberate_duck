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

var  userRoutes = require('./routes/users')


// Route setup

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


//===========================
//Project Routes
//===========================

//INDEX ROUTE


app.get("/projects", function(req,res) {
  console.log(req.user)
  Project.find({}, function(err, projects){
    if (err) {
      console.log(err)
    } else {
      res.render("./projects/index", {projects: projects})
    }
  })
})
//
//NEW ROUTE
app.get("/projects/new", function(req,res){
  res.render("./projects/new")
  //console.log(req.body)
})

// //CREATE ROUTE
app.post("/projects", function(req,res){
  Project.create(req.body, function(err, createdProject){
    if (err) {
      console.log(err)
    } else {
      //console.log(req.body)
      res.redirect("/projects")
    }
  })
})


//SHOW ROUTE
app.get("/projects/:id", function(req,res) {
  Project.findById(req.params.id).populate("stories").exec(function (err, foundProject) {
    if (err) {
      console.log(err)
      res.redirect("/projects")
    } else {
      //console.log("Show route, " + foundProject)
      res.render("./projects/show", {project: foundProject})
    }
  })
})


// //EDIT ROUTE
app.get("/projects/:id/edit", function(req, res){
  Project.findById({_id: req.params.id}, function(err, foundProject){
    if (err) {
      console.log(err)
    } else {
      //console.log(foundStory)
      res.render("./projects/edit", {project: foundProject})
    }
  })
})
//
// //UPDATE Route
app.put("/projects/:id", function(req, res){
  Project.findByIdAndUpdate(req.params.id, req.body, function(err, updatedProject){
    if (err) {
      console.log(err)
      res.redirect("/projects/" + req.params.id)
    }
    res.redirect("/projects")
  })

})
//
// //DESTROY Route
app.delete("/projects/:id", function(req,res){
  Project.findByIdAndRemove(req.params.id, function(err){
    if (err) {
      console.log(err)
      res.redirect("/projects/" + req.params.id)
    } else {
      res.redirect("/projects")
    }

  })
})

//===========================
//STORY ROUTES
//===========================


//NEW ROUTE
app.get("/projects/:id/stories/new", isLoggedIn, function(req,res){
  Project.findById(req.params.id, function(err, foundProject){
    if(err) console.log(err)
    res.render("./stories/new", {project: foundProject})
  })

})

//CREATE ROUTE
app.post("/projects/:id/stories", isLoggedIn, function(req,res){
  Project.findById(req.params.id, function(err, foundProject){
    if (err) {
      console.log(err)
      res.redirect("/projects")
    } else {
      Story.create(req.body.story, function(err, createdStory){
        if (err) {
          console.log(err)
        } else {
          //console.log(typeof(req.user.id))
          createdStory.owner.id = req.user._id
          createdStory.owner.username = req.user.username
          createdStory.save()
          foundProject.stories.push(createdStory)
          foundProject.save()
          //console.log(req.body)
          res.redirect("/projects/:id")
        }
      })

    }

  })

})

//SHOW ROUTE
app.get("/projects/:id/stories/:story_id", function(req,res) {
  Project.findById(req.params.proj_id, function (err, project){
    if (err) {
      console.log(err)
      res.redirect("/projects/" + req.params.proj_id)
    } else {
      Story.findById(req.params.story_id, function (err, foundStory) {
        if (err) {
          console.log(err)
          res.redirect("/projects/" + req.params.proj_id)
        } else {
          //console.log("Show route, " + foundStory)
          res.render("./stories/show", {story: foundStory})
        }
      })

    }

  })

})

//EDIT ROUTE
app.get("/projects/:id/stories/:story_id/edit", function(req, res){
  Project.findById(req.params.proj_id, function (err, project) {
    if (err) {
      console.log(err)
      res.redirect("/projects/" + req.params.proj_id)
    } else {
      Story.findById({_id: req.params.id}, function (err, foundStory) {
        if (err) {
          console.log(err)
        } else {
          //console.log(foundStory)
          res.render("./stories/edit", {story: foundStory})
        }
      })
    }
  })
})

//UPDATE Route
app.put("/projects/:id/stories/:id", function(req, res){
  Story.findByIdAndUpdate(req.params.id, req.body, function(err, updatedStory){
    if (err) {
      console.log(err)
      res.redirect("/stories/" + req.params.id)
    }
    res.redirect("/stories")
  })

})

//DESTROY Route
app.delete("/projects/:id/stories/:id", function(req,res){
  Story.findByIdAndRemove(req.params.id, function(err){
    if (err) {
      console.log(err)
      res.redirect("/stories/" + req.params.id)
    } else {
      res.redirect("/stories")
    }

  })
})
//===========================

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