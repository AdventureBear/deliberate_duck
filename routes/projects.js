
//PROJECT ROUTES
var express = require('express')
var router = express.Router({mergeParams: true})

Project = require("../models/project")

//INDEX ROUTE


router.get("/", function(req,res) {
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
router.get("/new", function(req,res){
  res.render("./projects/new")
  //console.log(req.body)
})

// //CREATE ROUTE
router.post("/", function(req,res){
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
router.get("/:id", function(req,res) {
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
router.get("/:id/edit", function(req, res){
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
router.put("/:id", function(req, res){
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
router.delete("/:id", function(req,res){
  Project.findByIdAndRemove(req.params.id, function(err){
    if (err) {
      console.log(err)
      res.redirect("/projects/" + req.params.id)
    } else {
      res.redirect("/projects")
    }

  })
})

function isLoggedIn(req, res, next){
  if(req.isAuthenticated()){
    return next()
  }
  res.redirect("/login")
}

module.exports = router