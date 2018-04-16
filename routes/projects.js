
//===========================
//Project Routes
//===========================
//INDEX ROUTE

var express = require('express'),
    router = express.Router({mergeParams: true}),
    Project = require('../models/project'),
    middleware = require('../middleware'),
    moment = require('moment'),
    today = moment().format('YYYY-MM-DD')



router.get("/", function(req,res) {
  //console.log(req.user)
  Project.find({}, function(err, projects){
    if (err) {
      console.log(err)
    } else {
      //some testing dates:
      res.render("./projects/index", {projects: projects})
    }
  })
})
//
//NEW ROUTE
router.get("/new", middleware.isLoggedIn, function(req,res){
  res.render("./projects/new", {today: today})
})

// //CREATE ROUTE
router.post("/", middleware.isLoggedIn, function(req,res){
  var project = req.body.project
  console.log(req.body.project)

  project.owner = {
    id: req.user._id,
    username: req.user.username
  }

  Project.create(project, function(err, createdProject){
    if (err) {
      console.log(err)
    } else {
      console.log("new project created: ", createdProject)
      res.redirect("/projects")
    }
  })
})


//SHOW ROUTE
router.get("/:id", function(req,res) {
  Project.findById(req.params.id).populate("stories").exec(function (err, foundProject) {
    if (err) {
      console.log(err)
      res.redirect("/projects")
    } else {
      res.render("./projects/show", {project: foundProject})
    }
  })
})


//EDIT ROUTE
router.get("/:id/edit", middleware.checkProjectOwnership,  function(req, res){
    Project.findById(req.params.id, function(err, foundProject){
      res.render("./projects/edit", {project: foundProject})
    })
})



//UPDATE Route
router.put("/:id", middleware.checkProjectOwnership, function(req, res){
  Project.findByIdAndUpdate(req.params.id, req.body.project, function(err, updatedProject){
    res.redirect("/projects")
  })
})


//DESTROY Route
router.delete("/:id", middleware.checkProjectOwnership, function(req,res){
  Project.findByIdAndRemove(req.params.id, function(err){
      res.redirect("/projects")
  })
})


module.exports = router