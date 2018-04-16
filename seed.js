/**
 * Created by suzanne on 3/27/18.
 */
var mongoose = require('mongoose')
var Story = require('./models/story')
var Project = require('./models/project')
var User = require('./models/user')

var today = new Date()
var Users = [{
  username: "Fig",
  password: "password",
  firstName: "Sheriff Figgins",
  lastName: "Atkinson-Brown",
  email: "fuzzybuttkin@tricoachtools.com",
  avatar: "https://i.pinimg.com/564x/fc/12/cc/fc12cc324d70b024b750b409cf16daec.jpg",
  isAdmin: true
},{
  username: "Tiny",
  password: "password",
  firstName: "Tiny",
  lastName: "Dancer",
  email: "tdancer@tricoachtools.com",
  avatar: "https://i.pinimg.com/originals/15/51/16/15511663529b02d47fd3e5128a56c149.jpg",
  isAdmin: false
}
]

var Projects = [{
  name: "TriCoach Tools",
  avatarUrl: "https://st2.depositphotos.com/1010915/10790/v/950/depositphotos_107909866-stock-illustration-triathlon-icons-background.jpg",
  isPublic: true,
  dateDue: today.setDate(today.getDate() + 31),
  description: "Helping Coaches track athletes, race schedules and season planning.",
},{
  name: "Climbing Gym Tools",
  description: "Helping Gym owners and clients enjoy the sport of indoor climbing",
}]

var Stories = [
  [{
    name: "Add an athlete",
    asA: "Coach",
    iWant: "to add an athlete",
    soThat: "I can manage their training",
    details: "Coaches need to keep track of their athletes, but also manage each individual atheltes training schedule. By adding the athelte the coach should automatically be associated with that athlete, and the athlete with the coach. ",
    created:  today,
    due: today.setDate(today.getDate() + 7),
    completed: true
  }, {
    name: "Add a race",
    asA: "Coach",
    iWant: "to add a race to an athlete's schedule",
    soThat: "I can manage their training",
    details: "Coaches need to know the athlete's races prior to beginning season planning in order to create appropriate trianing progressions to perform best for each race",
    created:  today,
    due: today.setDate(today.getDate() + 10),
    completed: false
  }, {
    name: "Enter Race Results",
    asA: "Athlete",
    iWant: "to add my race results",
    soThat: "I can track my racing and share results with my coach",
    details: "After a race I want to either upload my garmin, or type in the manual details for my recent race. ",
    created:  Date.now(),
    due: today.setDate(today.getDate() + 3),
    completed: false
  }],
  [
    {
      name: "Track Climbing Grade",
      asA: "User",
      iWant: "to record the grade of each climb",
      soThat: "I can track my progress over time",
      details: "Climbing grades are general but over time tracking them can tell me if I'm improving",
      created:  Date.now(),
      due: today.setDate(today.getDate() + 7),
      completed: false
    },
    {
      name: "Create a route",
      asA: "Route Setter",
      iWant: "to record the date I set up a new route",
      soThat: "we can rotate routes every 3 weeks",
      details: "Each face will have it's typical number of climbs and every 3 weeks we'll replace a new face in the gum with fresh routes ",
      created:  Date.now(),
      due: today.setDate(today.getDate() + 5),
      completed: false
    }

  ]
]


function seedDB() {
  User.remove({}, function(err){
    Story.remove({}, function(err){
     if (err) console.log(err)
      Project.remove({}, function(err){
       if (err) console.log(err)


        //Make First User 0
        var newUser = new User(Users[0])
       // console.log(newUser)
        User.register(newUser, newUser.password, function(err, user){
          if(err) console.log(err);
            console.log("User Created: "  + user.username)

            //Make new project
            var newProject = Projects[0]
            newProject.owner =
            {
              id: user._id,
              owner: user.username
            }

            Project.create(newProject, function (err, createdProject) {
              if (err) console.log(err)
                console.log("Project Created: " + createdProject.name)
                  //First Story
                  var newStory = Stories[0][0]
                    newStory.owner=
                      {
                        id: user._id,
                        username: user.username
                      }
                    Story.create(newStory, function (err, createdStory) {
                      if (err) console.log(err)
                      createdProject.stories.push(createdStory)
                      //createdProject.save()
                      console.log("Made new Story!" + createdStory.name)

                      //Second Story
                      var newStory = Stories[0][1]
                      newStory.owner=
                        {
                          id: user._id,
                          username: user.username
                        }
                      Story.create(newStory, function (err, createdStory2) {
                        if (err) console.log(err)
                        //console.log("Seeded DB with: " + createdStory)
                        createdProject.stories.push(createdStory2)
                        //createdProject.save()
                        console.log("Made new Story! " + createdStory2.name)

                        //Third Story
                        var newStory = Stories[0][2]
                        newStory.owner=
                          {
                            id: user._id,
                            username: user.username
                          }
                        Story.create(newStory, function (err, createdStory3) {
                          if (err) console.log(err)
                          //console.log("Seeded DB with: " + createdStory)
                          createdProject.stories.push(createdStory3)
                          createdProject.save()
                          console.log("Made new Story!" + createdStory3.name)
                        })
                      })
                    })


            })  //project.create
        })  //user.register
      })  //projects remove
    })  //stories remove
  })  //users remove
}

module.exports = seedDB