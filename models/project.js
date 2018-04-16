var mongoose = require('mongoose'),
  User = require('./user')


var projectSchema = new mongoose.Schema({
  name: String,
  description: String,
  avatar: String,
  dateDue: {
    type: Date,
    default:  Date.now()
  },
  dateCompleted: Date,
  isComplete: Boolean,
  isPublic: {
      type: Boolean,
      default: false
  },
  memberRequests: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }
  ],
  members: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }
  ],
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