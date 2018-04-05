
//===========================
//STORY ROUTES
//===========================

var express = require('express'),
  router = express.Router({mergeParams: true}),
  Project = require('../models/project'),
  Story = require('../models/story')

//NEW ROUTE
router.get("/new", isLoggedIn, function(req,res){
  Project.findById(req.params.id, function(err, foundProject){
    if(err) console.log(err)
    res.render("./stories/new", {project: foundProject})
  })

})

//CREATE ROUTE
router.post("/", isLoggedIn, function(req,res){
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
          createdStory.assignedTo.username= req.user._id
          createdStory.assignedTo.username = req.user.username
          createdStory.completed = false
          var tomorrow = new Date()
          createdStory.due  = tomorrow.setDate(tomorrow.getDate() + 7)
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
router.get("/:story_id", function(req,res) {
  // Project.findById(req.params.id, function (err, project){
  //   if (err) {
  //     console.log(err)
  //     res.redirect("/projects/" + req.params.proj_id)
  //   } else {
      Story.findById(req.params.story_id, function (err, foundStory) {
        if (err) {
          console.log(err)
          res.redirect("/projects/" + req.params.proj_id)
        } else {
          //console.log("Show route, " + foundStory)
          res.render("./stories/show", {story: foundStory, project_id: req.params.id})
        }
      })
//     }
//   })
 })

//EDIT ROUTE
router.get("/:story_id/edit", isLoggedIn,  function(req, res){
      Story.findById(req.params.story_id, function (err, foundStory) {
        if (err) {
          res.redirect("back")
        } else {
          if ((foundStory.owner.id!=null) && (foundStory.owner.id.equals(req.user._id))) {
            //console.log(foundStory)
            res.render("./stories/edit", {story: foundStory, project_id: req.params.id})
          } else {
            res.send("You don't own this story")
          }
        }
      })

})

//UPDATE Route
router.put("/:story_id", isLoggedIn, function(req, res){
  console.log("Update route")
  Story.findByIdAndUpdate(req.params.story_id, req.body, function(err, updatedStory){
    if (err) {
      console.log("error in story update")
      res.redirect("back")
    }
    //Logic to check or change completion date
    if (!req.body.story.completed){
        //box unchecked so make completed false
        updatedStory.completed = false
        //remove completed date if present
        updatedStory.completedDate = null
      } else {
        //box is checked, story is complete
        updatedStory.completed = true
        if (updatedStory.completedDate === null ) {
        updatedStory.completedDate = Date.now()
        }
    }
    updatedStory.save()
    console.log("Updated Story: " + updatedStory)
    res.redirect("/projects/" + req.params.id)
  })
})

//DESTROY Route
router.delete("/:story_id", function(req,res){
  Story.findByIdAndRemove(req.params.story_id, function(err){
    if (err) {
      console.log(err)
      res.redirect("back")
    } else {
      res.redirect("/projects/" + req.params.id )
    }

  })
})
//===========================

function checkStoryOwnership(req,res, next) {
  if(req.isAuthenticated()) {
    if ((foundStory.owner.id!=null) && (foundStory.owner.id.equals(req.user._id))) {
      next ()
    } else {
      res.redirect("back")
    }
    res.redirect("back")
  }


}
function isLoggedIn(req, res, next){
  if(req.isAuthenticated()){
    return next()
  }
  res.redirect("/login")
}

module.exports = router