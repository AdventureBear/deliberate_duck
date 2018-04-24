var db = require('../models')
var passport = require("passport")

exports.show = function(req,res) {
  res.render("register")
}

exports.register = function(req,res){
  var newUser = new db.User(req.body)
  if (req.body.adminCode === 'secretcode123') {
    newUser.isAdmin = true
  }
  db.User.register(newUser, req.body.password, function(err, user){
    if(err) {
      console.log(err);
      req.flash("error", err.message)
      return res.render('register')
    }  else {
      passport.authenticate("local")(req, res, function () {
        req.flash("success", "Successfully signed up. Welcome" + user.username)
        res.redirect("/projects")
      })
    }
  })
}


exports.login = function(req,res){
  res.render("login")
}

exports.authenticate =  passport.authenticate("local",
  {
    successRedirect: "/projects",
    failureRedirect: "/login"
  }), function(req,res) {
  //just sitting here because ??
}

exports.logout = function(req,res) {
  req.logout()
  req.flash("success", "Logged you out!")
  res.redirect("/projects")
}


module.export = exports