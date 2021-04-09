// importing all the npm modules
const express = require("express");
const app = express()
const mongoose = require("mongoose");
const passport = require("passport");
const bodyParser = require("body-parser");

// calling in the mongoose schema for the user
const User = require("./models/user");

// importing the mongoose schema model from the post.js file in the models folder
const Post = require('./models/post')

// setting the strategy to provide security using passport local
const LocalStrategy = require("passport-local");

// applying the security strategy to the user defined in the mongoose schema
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
passport.use(new LocalStrategy(User.authenticate()));

// simplifies the integration between Mongoose and Passport for local authentication
const passportLocalMongoose = require("passport-local-mongoose");
const twig = require("twig");

// set the Twig template engine
app.set('view engine', 'html');
app.engine('html', twig.__express);
app.set('views', 'views');

// defines the mongodb URL and stores it as a variable
const mongourl = "mongodb+srv://summative:team3@summative-3.gv8n6.mongodb.net/summative-3?retryWrites=true&w=majority";

mongoose.connect(mongourl, { useUnifiedTopology: true });

app.use(require("express-session")({
  secret: "Any normal Word", //decode or encode session, this is used to compute the hash.
  resave: false, //What this does is tell the session store that a particular session is still active, in the browser
  saveUninitialized: false //the session cookie will not be set on the browser unless the session is modified
}));

// make the public folder accessible to our backend application, so we can use the style.css file
app.use(express.static(__dirname + '/public'));

// add the bodyParser so we can return our information to the database
app.use(bodyParser.urlencoded({ extended:true }))

// turn on the passport dependency 
app.use(passport.initialize());

// start a new passport session for the user
app.use(passport.session());

const port = 3000;

app.listen(port, function (err) {
  if (err) {
    console.log(err);
  } else {
    console.log("Server Started At Port " + port);
  }
});

// LOGIN
app.get("/login", (req, res) => {
  res.render('login', {
    user: req.user
  });
});
// REGISTER
app.get("/register", (req, res) => {
    res.render('register', {
      user: req.user
    });
});
// PROFILE
// app.get("/profile", (req, res) => {
//   res.render("profile")
// });
// SELL TICKET - needs to be changed to check whether user is logged in or not
app.get("/sell-ticket", (req, res) => {
    res.render('sell-ticket', {
      user: req.user
    });
});

// set up the functionality for registering a new user
app.post("/register", (req, res) => {

//passport-local-mongoose function to register a new user
  User.register(new User({ 
    	firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
      number: req.body.number,
      username: req.body.username,
    	}),
    	req.body.password,
    	  function (err, user) {
    	    if (err) {
    	      console.log(err);
          }
          // authenticate the local session and redirect to login page
    	    passport.authenticate("local")(req, res, function () { 
            console.log(req);
    	      res.redirect("/login");
    	    })
    	  })
      });
      
  // set up the functionality for logging in an existing user
  // "Posting" the form data to the Mongo database with a passport.authenticate function as an argument
  // the passport npm module allows you to write a simple function, to achieve something much more complex 
  // such as encryped the password with hash & salt, and then being able to verify it
  app.post("/login", passport.authenticate("local",{
    // on success, redirect to the profile, on failure, redirect back to login
    successRedirect: "/profile",
    failureRedirect: "/login"
    })
  );

  // logout function
  app.get("/logout", (req, res) => {
    // passport module logout function and then a simple redirect back to the home page
    req.logout();
    res.redirect("/login");
  });

  // Check if user is authenticated and logged in, return a next() function to run the next piece of middleware if so, redirect to home page if not
  function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
      return next();
      res.redirect('/');
  }

  // stop users from selling if they haven't logged in
  app.get("/sell-ticket", isLoggedIn, (req, res) => {
    res.render('sell-ticket.html', { user: req.user })
  })

    app.get("/profile", isLoggedIn, (req, res) => {
    res.render('profile.html', { user: req.user })
  })

  app.post('/sell-ticket', (req, res) => {
    console.log("post submitted");

    // using the model created in post.js to post to the request
    new Post({
        title: req.body.title,
        category: req.body.category,
        description: req.body.description,
        tags: req.body.tags,
        img: req.body.img
      })
      // to save it to the datatbase
      .save()
      // then means, a function to complete once the previous one has completed
      .then(result => {
        // overide the default function and redirect the browser back to the homepage
        res.redirect('/')
      })
      // catching and displaying an error if there is one
      .catch(err => {
        if (err) throw err;
      })
  });

// delete function
app.get('/delete/:id', (req, res) => {
  Post.findByIdAndDelete(req.params.id)
    .then(result => {
      res.redirect('/');
    })
    .catch(err => {
      console.log(err);
      res.redirect('/');
    })
});

// view the posts on the home page
// Render the quotes to homepage
app.get('/', (req, res) => {
    // FETCH ALL POSTS FROM DATABASE
    Post.find()
    // SET descending ORDER BY createdAt
    .sort({createdAt: 'descending'})
    .then(result => {
        if(result){
            console.log(result);
            // RENDERING HOME VIEW WITH ALL POSTS
            res.render('home',{
                allpost:result,
                user: req.user
            });
        }
    })
    .catch(err => {
        if (err) throw err;
    }); 
});