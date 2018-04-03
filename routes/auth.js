

var express =   require("express")
var router  =   express.Router({mergeParams: true})
var passport = require("passport")
var User   =   require("../models/user")
//========================================
//Authentication Routes
//========================================

//show signup form
router.get('/register', function(req,res){
  res.render("register")
})


//user signup
router.post("/register", function(req,res){
  var newUser = new User({username: req.body.username})
  User.register(newUser, req.body.password, function(err, user){
    if(err) {
      console.log(err);
      return res.render('register')
    }  else {
      passport.authenticate("local")(req, res, function () {
        res.redirect("/projects")
      })
    }
  })
})


//LOGIN ROUTES
//render login form
router.get("/login", function(req,res){
  res.render("login")
})

router.post("/login", passport.authenticate("local",
  {
    successRedirect: "/projects",
    failureRedirect: "/login"
  }), function(req,res) {
  // console.log("Logged in" +currentUser)
  // res.redirect("/projects")
})


//Logout Routes
router.get("/logout", function(req,res) {
  req.logout()
  res.redirect("/projects")
})



module.exports = router