// Requiring our models and passport as we've configured it
var db = require("../models");
var passport = require("../config/passport");
var isAuthenticated = require("../config/middleware/isAuthenticated");
var express = require("express");
var router = express.Router();

db.User.sync();

//------------routes to handlebar files-------------

router.get("/login", (req, res) => {
  //Coming to login page after signup or direct click on login
  res.render("login");
});

router.get("/signup", (req, res) => {
  //coming here after click on signup
  res.render("signup");
});

router.get("/members", isAuthenticated, (req, res) => {
  //Coming from isauth function after checking
  res.render("members");
});

// Using the passport.authenticate middleware with our local strategy.
// If the user has valid login credentials, send them to the members page.
// Otherwise the user will be sent an error

//-----------------------api routes-----------------------------------------------
router.post("/api/login", passport.authenticate("local"), function(req, res) {
  // Sending back a password, even a hashed password, isn't a good idea
  //coming here after inserting the user into db
  res.json({
    username: req.user.username,
    id: req.user.id
  });
});

// Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
// how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
// otherwise send back an error
router.post("/api/signup", function(req, res) {
  db.User.create({
    username: req.body.username,
    password: req.body.password
  })
    .then(function() {
      res.redirect(307, "/api/login");
    })
    .catch(function(err) {
      res.status(401).json(err);
    });
});

//-------------------passport-github part--comment back in once page is registered with github------------------

// route middleware for github login
router.get("/auth/github", passport.authenticate("github"));

router.get(
  "/auth/github/callback",
  passport.authenticate("github", { failureRedirect: "/login" }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect("/");
  }
);

// Route for logging user out
router.get("/logout", function(req, res) {
  req.logout();
  res.redirect("/");
});

// Route for getting some data about our user to be used client side
router.get("/api/user_data", function(req, res) {
  if (!req.user) {
    // The user is not logged in, send back an empty object
    res.json({});
  } else {
    // Otherwise send back the user's username and id
    // Sending back a password, even a hashed password, isn't a good idea
    res.json({
      username: req.user.username,
      id: req.user.id
    });
  }
});

module.exports = router;
