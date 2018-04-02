
//=============================================
//STORY ROUTES
// ==========================
var express = require('express')
var router = express.Router({mergeParams: true})

Project = require("../models/project")
Story = require("../models/story")



function isLoggedIn(req, res, next){
  if(req.isAuthenticated()){
    return next()
  }
  res.redirect("/login")
}

module.exports  = router