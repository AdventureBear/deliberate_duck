//==============
// USERS ROUTES
//==============

var express =   require("express")
var router  =   express.Router({mergeParams: true})
var User   =   require("../models/user")

router.get("/", function(req, res){
  User.find({}, function(err, foundUsers){
    if (err) {
      console.log(err)
    } else {
      res.render("users/index", {users: foundUsers})
    }
  })
})


module.exports = router
