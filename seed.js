/**
 * Created by suzanne on 3/27/18.
 */
var mongoose = require('mongoose')
var Story = require('./models/story')
var Project = require('./models/project')

var Projects = [{
  name: "TriCoach Tools",
  description: "Helping Coaches track athletes, race schedules and season planning.",
  owner: { username: "Elliot" }
},{
  name: "Climbing Gym Tools",
  description: "Helping Gym owners and clients enjoy the sport of indoor climbing",
  owner: { username: "Michael" }
}]
var Stories = [
  [{
    name: "Add an athlete",
    asA: "Coach",
    iWant: "to add an athlete",
    soThat: "I can manage their training",
    details: "Coaches need to keep track of their athletes, but also manage each individual atheltes training schedule. By adding the athelte the coach should automatically be associated with that athlete, and the athlete with the coach. ",
    created:  Date.now(),
    owner: { username: "Elliot"}
  }, {
    name: "Add a race",
    asA: "Coach",
    iWant: "to add a race to an athlete's schedule",
    soThat: "I can manage their training",
    details: "Coaches need to know the athlete's races prior to beginning season planning in order to create appropriate trianing progressions to perform best for each race",
    created:  Date.now(),
    owner: { username: "Elliot"}
  }, {
    name: "Enter Race Results",
    asA: "Athlete",
    iWant: "to add my race results",
    soThat: "I can track my racing and share results with my coach",
    details: "After a race I want to either upload my garmin, or type in the manual details for my recent race. ",
    created:  Date.now(),
    owner: { username: "admin"}
  }],
  [
    {
      name: "Track Climbing Grade",
      asA: "User",
      iWant: "to record the grade of each climb",
      soThat: "I can track my progress over time",
      details: "Climbing grades are general but over time tracking them can tell me if I'm improving",
      created:  Date.now(),
      owner: { username: "Toby"}
    },
    {
      name: "Create a route",
      asA: "Route Setter",
      iWant: "to record the date I set up a new route",
      soThat: "we can rotate routes every 3 weeks",
      details: "Each face will have it's typical number of climbs and every 3 weeks we'll replace a new face in the gum with fresh routes ",
      created:  Date.now(),
      owner: { username: "Mr. Robot"}
    }

  ]
]


function seedDB() {
  Story.remove({}, function(err){
   if (err) console.log(err)
    Project.remove({}, function(err){
     if (err) console.log(err)
      Projects.forEach(function(project, i){

        Project.create(project, function(err, createdProject){
          if (err) console.log(err)
          Stories[i].forEach(function(story, j){
            Story.create(story, function(err, createdStory){
              if (err) console.log(err)
              //console.log("Seeded DB with: " + createdStory)
              createdProject.stories.push(createdStory)
              createdProject.save()
              console.log("Project " + (i +1) + ", Story " + (j+1) + " created")
            })
          })

        })

      })



    })

  })
}

module.exports = seedDB