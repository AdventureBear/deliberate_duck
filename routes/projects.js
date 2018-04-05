
//===========================
//Project Routes
//===========================
//INDEX ROUTE

var express = require('express'),
    router = express.Router({mergeParams: true}),
    Project = require('../models/project')

router.get("/", function(req,res) {
  //console.log(req.user)
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
})

// //CREATE ROUTE
router.post("/", isLoggedIn, function(req,res){
  var project = {
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
      res.render("./projects/show", {project: foundProject})
    }
  })
})


//EDIT ROUTE
router.get("/:id/edit", checkProjectOwnership,  function(req, res){
    Project.findById({_id: req.params.id}, function(err, foundProject){
      res.render("./projects/edit", {project: foundProject})
    })
})



//UPDATE Route
router.put("/:id", checkProjectOwnership, function(req, res){
  Project.findByIdAndUpdate(req.params.id, req.body, function(err, updatedProject){
    res.redirect("/projects")
  })
})


//DESTROY Route
router.delete("/:id", checkProjectOwnership, function(req,res){
  Project.findByIdAndRemove(req.params.id, function(err){
      res.redirect("/projects")
  })
})

function checkProjectOwnership(req,res,next){
  if (req.isAuthenticated()){
    Project.findById({_id: req.params.id}, function(err, foundProject){
      if (err) {
        console.log(err)
        res.redirect("back")
      } else {
        console.log(foundProject)
        //when DB is cleaned up, this next statement can be simplified to remove !=null part
        if ((foundProject.owner.id!=null) && (foundProject.owner.id.equals(req.user._id))) {
          //console.log(foundStory)
          next()
        } else {
          res.redirect("back")
        }
      }
    })
  } else {
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