//middleware goes here
var middlewareObj = {}
var Project = require("../models/project")
var Story = require("../models/story")

middlewareObj.checkProjectOwnership = function(req,res,next){
    if (req.isAuthenticated()){
      Project.findById({_id: req.params.id}, function(err, foundProject){
        if (err) {
          console.log(err)
          req.flash("error", "Project not found!")
          res.redirect("back")
        } else {
          //console.log(foundProject)
          if (((foundProject.owner.id.equals(req.user._id))) || (req.user.isAdmin))  {
            //console.log(foundStory)
            next()
          } else {
            req.flash("error", "You don't have permission to do that!")
            res.redirect("back")
          }
        }
      })
    } else {
      req.flash("error", "You must be logged in!")
      res.redirect("back")
    }
}


middlewareObj.checkStoryOwnership = function(req,res,next) {
  if (req.isAuthenticated()){
    Story.findById({_id: req.params.story_id}, function(err, foundStory){
      if (err) {
        console.log(err)
        res.redirect("back")
      } else {
        //console.log(foundStory)
        if ( (foundStory.owner.id.equals(req.user._id)) || (req.user.isAdmin)){
          //console.log(foundStory)
          next()
        } else {
          res.redirect("back")
        }
      }
    })
  } else {
    req.flash("error", "You must be logged in!")
    res.redirect("back")
  }
}


middlewareObj.isLoggedIn = function(req, res, next){
  if(req.isAuthenticated()){
    return next()
  }
  req.flash("error", "You must be logged in!")
  res.redirect("/login")
}


module.exports = middlewareObj