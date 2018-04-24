/**
 * Created by suzanne on 4/23/18.
 */

var mongoose = require('mongoose')
mongoose.set('debug', true)
var dotenv = require('dotenv').config()

mongoose.connect(process.env.MONGO_URL)

mongoose.Promise = Promise

module.exports.Project = require('./project')
module.exports.Story = require('./story')
module.exports.User = require('./user')