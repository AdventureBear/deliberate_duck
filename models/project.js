var mongoose = require('mongoose'),
  User = require('./user')

var projectSchema = new mongoose.Schema({
  name: String,
  description: String,
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  stories: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Story"
    }
  ],
  created: {
    type: Date,
    default: Date.now()
  },
  owner:
    {
      id:
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User"
        },
      username: String
    }
})

module.exports = mongoose.model("Project", projectSchema)