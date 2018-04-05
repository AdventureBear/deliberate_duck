
//===========================
//Project Routes
//===========================
//INDEX ROUTE

var express = require('express'),
    router = express.Router({mergeParams: true}),
    Project = require('../models/project')

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
router.get("/new", isLoggedIn, function(req,res){
  res.render("./projects/new")
  //console.log(req.body)
})

// //CREATE ROUTE
router.post("/", isLoggedIn, function(req,res){
  project = {
    name: req.body.name,
    description: req.body.description,
    owner: {
      id: req.user._id,
      username: req.user.username
    }
  }

  Project.create(project, function(err, createdProject){
    if (err) {
      console.log(err)
    } else {

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
router.get("/:id/edit", isLoggedIn, function(req, res){
  Project.findById({_id: req.params.id}, function(err, foundProject){
    if (err) {
      console.log(err)
    } else {
      console.log(foundProject)
      //when DB is cleaned up, this next statement can be simplified to remove !=null part
      if ((foundProject.owner.id!=null) && (foundProject.owner.id.equals(req.user._id))) {
        //console.log(foundStory)
        res.render("./projects/edit", {project: foundProject})
      } else {
        res.send("You don't own this project")

      }
    }
  })
})
//
// //UPDATE Route
router.put("/:id", isLoggedIn, function(req, res){
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
router.delete("/:id", isLoggedIn, function(req,res){
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