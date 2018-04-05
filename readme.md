#RESTful Routing

##Site Index
* Setup the Site App
* Create the main component model
* Add INDEX route and template

##Basic Layout
* Add Header and Footer Partials
* Include Semantic UI
* Add Simple Nav

##Putting the C in CRUD
* Add NEW route
* Add NEW template
* Add CREATE route
* Add CREATE template

##SHOWtime
* Add Show route
* Add Show template
* Add links to show page
* Style show template

##Edit/Update
* Add Edit Route
* Add Edit Form
* Add Update Route
* Add Update Form
* Add Method-Override

##DESTROYYYYYY
* Add Destroy Route
* Add Edit and Destroy Links

##Final Updates
* Sanitize blog body
* Style Index
* Update REST Table


#Refactor Mongoose Code
* Create a models directory
* Use module.exports
* Require everything correctly!

#Add Seeds File
* Add a seeds.js file
* Run the seeds file every time the server starts

#Add the Comment model!
* Make our errors go away!
* Display comments on campground show page

#Comment New/Create
* Discuss nested routes
* Add the comment new and create routes
* Add the new comment form

#Style Show Page
* Add sidebar to show page
* Display comments nicely


# RESTFUL ROUTES
```
name      url      verb    desc.
===============================================
INDEX   /dogs      GET   Display a list of all dogs
NEW     /dogs/new  GET   Displays form to make a new dog
CREATE  /dogs      POST  Add new dog to DB
SHOW    /dogs/:id  GET   Shows info about one dog

INDEX   /projects
NEW     /projects/new
CREATE  /projects
SHOW    /projects/:id

NEW     projects/:id/stories/new    GET
CREATE  projects/:id/stories      POST
```

#Auth Code Tools Parts 1/2
* Install needed packages
  * Passport
  * Passport Local 
  * Passport Local Mongoose
  * Express-Session

#Auth Code Along pt 3
* Create User Model
* Configure Passport
```$xslt
//setup passport
app.use(require("express-session")({
  secret: "Fig is the best puppy ever",
  resave: false,
  saveUninitialized: false
}))

app.use(passport.initialize())
app.use(passport.session())

passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())
```

# Part 4
* Add Register Routes
* Add Register Form
* Add Login Routes
* Add Login Form

# Part 5
* Add Logout Route
* Add middleware isLoggedIn

# Part 6
* Add links to nav/bar
* Show/Hide navbar links

# Refactor Routes
* Split routes into different files in routes dir
* Include routes in app.js
* Use Express Router to refactor routes

# Associating Users & Comments (or any 2 related tables)
* Associate two models
* Add users name to story when created
* Add users name to project when created

# Authorization
* User can only edit/update/delete his/her projects
* User can only edit/update/delete his/her stories
* Add middleware to check ownership
* Hide/show edit/delete buttons
