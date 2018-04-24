var express =   require("express")
var router  =   express.Router({mergeParams: true})
var passport = require("passport")
var db      =   require("../models")
var helpers = require('../helpers/auth')

//========================================
//Authentication Routes
//========================================

router.route('/register')
  .get(helpers.show)
  .post(helpers.register)

router.route('/login')
  .get(helpers.login)
  .post(helpers.authenticate)


router.route('/logout')
  .get(helpers.logout)

module.exports = router