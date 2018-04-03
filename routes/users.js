//==============
// USERS ROUTES
//==============

var express =   require("express")
var router  =   express.Router({mergeParams: true})
var User   =   require("../models/user")


//===========================
// USER ROUTES
//===========================
router.get("/users", function(req, res){
  console.log("in the user file")
  User.find({}, function(err, foundUsers){
    if (err) {
      console.log(err)
    } else {
      console.log(foundUsers)
      res.render("users/index", {users: foundUsers})
    }
  })
})


module.exports = router
