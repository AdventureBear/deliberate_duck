//==============
// USERS ROUTES
//==============

var express =   require("express")
var router  =   express.Router({mergeParams: true})
var User   =   require("../models/user")
var Project = require("../models/project")
var middleware = require("../middleware")


//===========================
// USER ROUTES
//===========================
router.get("/", middleware.isLoggedIn, function(req, res){
  if (req.user.isAdmin) {
    User.find({}, function(err, foundUsers){
      if (err) {
        console.log(err)
        req.flash("error", "Something went wrong")
      } else {
        res.render("users/index", {users: foundUsers})
      }
    })
  } else {
      res.redirect("users/"+ req.user.username)
  }

})

router.get("/:username", middleware.isLoggedIn, function(req,res){
  User.findOne({username: req.user.username}, function (err, foundUser){
    if (err) {
      console.log(err)
      req.flash("error", "Cannot Find User")
      res.redirect("/projects")
    } else {
      Project.find().where('owner.id').equals(foundUser._id).exec(function(err, projects){
        res.render("users/show", {user: foundUser, projects: projects})
      })

    }
  } )

})


module.exports = router
