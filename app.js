// importing all the npm modules
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const passport = require("passport");
const bodyParser = require("body-parser");

// importing in the mongoose schemas
const User = require("./models/user");
const Post = require("./models/post");

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

mongoose.connect(mongourl, {
  useUnifiedTopology: true
});

app.use(require("express-session")({
  secret: "Any normal Word", //decode or encode session, this is used to compute the hash.
  resave: false, //What this does is tell the session store that a particular session is still active, in the browser
  saveUninitialized: false //the session cookie will not be set on the browser unless the session is modified
}));

// make the public folder accessible to our backend application, so we can use the style.css file
app.use(express.static(__dirname + '/public'));

// add the bodyParser so we can return our information to the database
app.use(bodyParser.urlencoded({
  extended: true
}));

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
// SELL TICKET 
app.get("/sell-ticket", (req, res) => {
  res.render('sell-ticket', {
    user: req.user
  });
});
// CONFIRM
app.get("/confirm", (req, res) => {
  res.render('confirm', {
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
      });
    });
});

// set up the functionality for logging in an existing user
// "Posting" the form data to the Mongo database with a passport.authenticate function as an argument
// the passport npm module allows you to write a simple function, to achieve something much more complex 
// such as encryped the password with hash & salt, and then being able to verify it
app.post("/login", passport.authenticate("local", {
  // on success, redirect to the profile, on failure, redirect back to login
  successRedirect: "/sell-ticket",
  failureRedirect: "/login"
}));

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
  res.render('sell-ticket.html', {
    user: req.user
  });
});

app.get("/profile", isLoggedIn, (req, res) => {

  Post.find()

    // SET descending ORDER BY createdAt
    .sort({
      createdAt: 'descending'
    })
    .then(result => {
      if (result) {
        console.log(result);
        // RENDERING HOME VIEW WITH ALL POSTS
        res.render('profile', {
          allpost: result,
          user: req.user
        });
      }
    })
    .catch(err => {
      if (err) throw err;
    });
});

// Sell-ticket function 
app.post('/sell-ticket', (req, res) => {
  console.log("post submitted");

  // using the model created in post.js to post to the request
  new Post({
      title: req.body.title,
      modalId: req.body.modalId,
      place: req.body.place,
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
      res.redirect('/');
    })
    // catching and displaying an error if there is one
    .catch(err => {
      if (err) throw err;
    });
});

// Comment Function
app.post('/comment/:id', (req, res) => {
  Post.findById(req.params.id)
    .then(result => {
      if (result) {
        const new_comment = " " + req.body.comment;
        Post.findByIdAndUpdate(req.params.id, {
          $push: {
            comment: new_comment
          }
        }, {
          returnOriginal: false
        }).exec();
        console.log(Post.comment);
      } else {
        console.log(err);
        res.redirect('/');
      }
    })
    .then(update => {
      res.redirect('/');
    })
    .catch(err => {
      res.redirect('/');
    });
});

// delete function
app.get('/delete/:id', (req, res) => {
  Post.findByIdAndDelete(req.params.id)
    .then(result => {
      res.redirect('/profile');
    })
    .catch(err => {
      console.log(err);
      res.redirect('/profile');
    });
});

// view the posts on the home page
// Render the quotes to homepage
app.get('/', (req, res) => {
  // FETCH ALL POSTS FROM DATABASE
  Post.find()
    // SET descending ORDER BY createdAt
    .sort({
      createdAt: 'descending'
    })
    .then(result => {
      if (result) {
        console.log(result);
        // RENDERING HOME VIEW WITH ALL POSTS
        res.render('home', {
          allpost: result,
          user: req.user
        });
      }
    })
    .catch(err => {
      if (err) throw err;
    });
});

// UPDATE POST
app.post('/edit/:id', (req, res) => {
  Post.findById(req.params.id)
    .then(result => {
      if (result) {
        console.log('updated');
        result.title = req.body.title;
        result.place = req.body.place;
        result.category = req.body.category;
        result.description = req.body.description;
        result.tags = req.body.tags;
        result.img = req.body.img;
        return result.save();
      } else {
        console.log(err);
        res.redirect('/profile');
      }
    })
    .then(update => {
      res.redirect('/profile');
    })
    .catch(err => {
      res.redirect('/profile');
    });
});