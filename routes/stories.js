
//===========================
//STORY ROUTES
//===========================

var express = require('express'),
  router = express.Router({mergeParams: true}),
  Project = require('../models/project'),
  Story = require('../models/story'),
  middleware = require('../middleware'),
  moment = require('moment'),
  today = moment().format('YYYY-MM-DD')

//NEW ROUTE
router.get("/new", middleware.isLoggedIn, function(req,res){
  Project.findById(req.params.id, function(err, foundProject){
    if(err) console.log(err)
    res.render("./stories/new", {project: foundProject, today: today})
  })

})

//CREATE ROUTE
router.post("/", middleware.isLoggedIn, function(req,res){
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
          // createdStory = {
          //   owner: {
          //     id: req.user._id,
          //     username: req.user.username
          //   },
          //   assignedTo: {
          //     id: req.user._id,
          //     username: req.user.username
          //   }
          //   completed: false
          //   due: tomorrow.setDate(tomorrow.getDate() + 7)
          //}
          createdStory.owner.id = req.user._id
          createdStory.owner.username = req.user.username
          createdStory.assignedTo.id= req.user._id
          createdStory.assignedTo.username = req.user.username
          createdStory.completed = false
          //createdStory.due  = today.setDate(today.getDate() + 7)

          createdStory.save()
          foundProject.stories.push(createdStory)
          foundProject.save()
          //console.log(req.body)
          req.flash("success", "New Story Added!")
          res.redirect("/projects/:id")
        }
      })

    }
  })
})

//SHOW ROUTE
router.get("/:story_id", function(req,res) {
      Story.findById(req.params.story_id, function (err, foundStory) {
        if (err) {
          console.log(err)
          res.redirect("/projects/" + req.params.proj_id)
        } else {
          console.log("Found Story")
          res.render("./stories/show", {story: foundStory, project_id: req.params.id})
        }
      })
 })

//EDIT ROUTE
router.get("/:story_id/edit", middleware.checkStoryOwnership,  function(req, res){
      Story.findById(req.params.story_id, function (err, foundStory) {
        if (err) {
          res.redirect("back")
        } else {
          res.render("./stories/edit", {story: foundStory, project_id: req.params.id})
        }
      })

})

//UPDATE Route
router.put("/:story_id", middleware.checkStoryOwnership, function(req, res){
  // var newStory = {
  //   name:       req.body.story.name,
  //   asA:        req.body.story.asA,
  //   iWant:      req.body.story.iWant,
  //   soThat:     req.body.story.soThat,
  //   details:    req.body.story.details,
  //   completed:  req.body.story.completedDate,
  // }
  //console.log("Update route")
  Story.findByIdAndUpdate(req.params.story_id, req.body.story, function(err, updatedStory){
    if (err) {
      console.log(err)
      req.flash("error", "Could not update story")
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
    //console.log("Updated Story: " + updatedStory)
    //console.log("Body", req.body)
    res.redirect("/projects/" + req.params.id)
  })
})

//DESTROY Route
router.delete("/:story_id", middleware.checkStoryOwnership, function(req,res){
  Story.findByIdAndRemove(req.params.story_id, function(err){
    if (err) {
      console.log(err)
      res.redirect("back")
    } else {
      ///remove story from project story array
      Project.update( {_id: req.params.id},
        {
          $pull: { stories: req.params.story_id }
        }, function(err,results) {
          req.flash("success", "Story Removed!")
          res.redirect("/projects/" + req.params.id)
        })
    }
    })
})







module.exports = router