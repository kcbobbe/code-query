// require("dotenv").config();
// Requiring necessary npm packages
const path = require("path");
const express = require("express");
const session = require("express-session");
const exphbs = require("express-handlebars");
const http = require("http");
// Requiring passport as we've configured it
const passport = require("./config/passport");
const socketIO = require("socket.io");

//github oauth
// var GitHubStrategy = require("passport-github").Strategy;

// passport.use(
//   new GitHubStrategy(
//     {
//       clientID: process.env.GITHUB_CLIENT_ID,
//       clientSecret: process.env.GITHUB_CLIENT_SECRET,
//       callbackURL: "/"
//     },
//     function(accessToken, refreshToken, profile, cb) {
//       User.findOrCreate({ githubId: profile.id }, function(err, user) {
//         return cb(err, user);
//       });
//     }
//   )
// );

// Setting up port and requiring models for syncing
var PORT = process.env.PORT || 8085;
var db = require("./models");

// Creating express app and configuring middleware needed for authentication
var app = express();
//Creating new server to integrate with socket.io
let server = http.createServer(app);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
app.use(express.static(__dirname + "/public"));
// We need to use sessions to keep track of our user's login status
app.use(
  session({ secret: "keyboard cat", resave: true, saveUninitialized: true })
);
//handlebars
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");
app.set("views", path.resolve("public", "views"));

//pull in passport middleware
passport.serializeUser(function(user, cb) {
  cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
  cb(null, obj);
});

app.use(passport.initialize());
app.use(passport.session());

// Import routes and give the server access to them.
const routes = require("./controllers/userController");
const qRoutes = require("./controllers/questionController");
const aRoutes = require("./controllers/answerController");
app.use(routes, qRoutes, aRoutes);

//Run when a client connects

let io = socketIO(server);

io.on("connection", socket => {
  console.log("New socket connection on console.....................");
  socket.on("newPost", msg => {
    console.log(msg);
    io.emit("newPost", msg);
  });
});

// Syncing our database and logging a message to the user upon success
db.sequelize.sync().then(function() {
  server.listen(PORT, function() {
    console.log(
      "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
      PORT,
      PORT
    );
  });
});
