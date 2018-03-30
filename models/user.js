var mongoose = require("mongoose")
var passportLocalMongoose = require("passport-local-mongoose")

var UserSchema = new mongoose.Schema({
  username: String,
  password: String,
  firstName: String,
  lastName: String,
  email: String
})

UserSchema.plugin(passportLocalMongoose, {
  selectFields : 'username password firstName lastName email'
})

module.exports = mongoose.model("User", UserSchema)