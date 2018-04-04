mongoose = require("mongoose")

var storySchema = new mongoose.Schema({
  name: String,
  asA: String,
  iWant: String,
  soThat: String,
  details: String,
  created: {
    type: Date,
    default: Date.now()
  },
  completed: Boolean,
  competedDate: Date,
  due: Date,
  assignedTo:
    {
      id:
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User"
        },
      username: String
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



module.exports = mongoose.model("Story", storySchema)

