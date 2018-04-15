# Deliberate Duck
> Organizing Chaos for Random Thinkers

Deliberate Duck organizes the pieces of your next project, helping solo developers, small teams of coders,
and clients share and communicate main features. 

Everyone can create an account, share access to projects, create 
user stories with clarity and efficiency.  The backlog of stories can be
assigned to one person or a team, completion dates noted, progress tracked 
right through to final completion and delivery of a project. 

When a desired feature becomes complex, Deliberate Duck allows you to break it down
into smaller parts so that each piece is a bit sized piece of coding work 
that can be completed by one developer in a discrete doable chuck of time. (We believe 
4 Pomodoro's is a reasonable chunk of time). 

With deliberate duck, you'll finish your projects faster, with less confusion and distraction
ensuring a functional and bug free app! 

Deliberate duck is ideal for bootcamp students, self-taught coders and online learners to 
help track all of your project requirements. 

## Features
* Create projects and begin tracking and adding user stories
* Request access to public projects
* Invite other team members to projects you own
* Import a list of user stories in a standard format
* Visually track progress to completion
* Built in AI helps to identify backlog bloat and feature creep 


## Installing / Getting started

### Setup your Mongo Database
You can use mLab or locally hosted mongo setup.  Either option will require 
a connection URL string that looks like one of these: 

    mongodb://username:password@df01326.mlab.com:1512/ducks
    mongodb://localhost/ducks
    
Use the appropriate URL in your .env file 

### Customize your .env file
Environmental variables are used to hide sensitive information from outside eyes
and allow the application to function between users, or let you quickly update your 
port or database for your application. Currently there are two environmental varaibles to set up:
 
Follow these steps to setup your .env file
   - rename sample.env to .env
   - change PORT to appropriate Port value
   - change Mongo URL to appropriate Mongo connection
      

### Install nodemodules with npm and start app.js
  ```
  npm install 
  nodemon app.js
  ```
This will install all the node_modules required for your app to run, and start the Deliberate Duck server on the port you specified in your .env file.



## Seed File Setup

The seeds.js file will run when you start the server using ```nodemon app.js``` or ```node app.js```. 
Use caution as this will overwrite any previous databases using the name in your Mongo URL. 

If you are not in production and assisting with open source development of Deliberate Duck (thank you), you 
can leave the seedsDB() fuction in the app.js file. 

However if you are ready to begin production use, you MUST comment out the seedDB() command in the app.js file 
during the app setup as show here: 

    app.use(bodyParser.urlencoded({extended: true}))
    app.use(express.static(__dirname + "/public"))
    app.use(methodOverride("_method"))
    app.use(flash())
    app.set("view engine", "ejs")
    //seedDB()      <-- comment or remove this line for production use
    

## Contributing

Deliberate Duck is a fun, useful application ideal for beginning developers to both use AND
contribute to! 

If you'd like to contribute, please fork the repository and use a feature
branch. Pull requests are warmly welcome.

### Style Guide: 
I'm pretty new to this, currently it is written in ES5, but I'm open to ES6 and will 
begin refactoring it ASAP. 

Deliberate Ducks feel that semi-colons are visual clutter, please don't use them


## Links

- Project homepage: https://your.github.com/awesome-project/
- Repository: https://github.com/your/awesome-project/
- Issue tracker: https://github.com/your/awesome-project/issues
  - In case of sensitive bugs like security vulnerabilities, please contact
    my@email.com directly instead of using issue tracker. We value your effort
    to improve the security and privacy of this project!
- Related projects:
  - Your other project: https://github.com/your/other-project/
  - Someone else's project: https://github.com/someones/awesome-project/


## Licensing

"The code in this project is licensed under MIT license."
