//Codebase from Brad Travery YouTube video 'Node.js with Passport Authentication'

//bring in dependencies
const express = require("express");
const expresslayouts = require("express-ejs-layouts");
const mongoose = require("mongoose");
const flash = require("connect-flash");
const session = require("express-session");
const passport = require("passport");
const path = require('path');

const app = express();

// bring in passport config
require ("./config/passport")(passport);

// Invoke the dotenv file
require("dotenv").config();

// Database configuration
const db = process.env.DB_CONNECTION;

// Use mongoose to connect to mongoDB
mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true})
.then(() => console.log("MongoDatabase Connected!"))
.catch(err => console.log(err));


// Middleware: EJS
app.use(expresslayouts);
app.set(`view engine`, `ejs`);

// Middleware: Body Parser
app.use(express.urlencoded({ extended: false }));

// Express session code
//source github.com/expressjs/session/blob/master/README.md
app.use(session({
  secret: "secret",
  resave: true,
  saveUninitialized: true,
}));

// passport middleware from passportjs.org/docs.
//Start and track a session
app.use(passport.initialize());
app.use(passport.session());

// Connect flash (envoke)
app.use(flash());

// Global variables for flash
app.use((req, res, next) => {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  res.locals.error = req.flash("error");
  next();
});

// Courtesy of Linden (Our Tutor)
// Middleware for validation protection when travelling pages
const nocache = (req, res, next) => {
  res.header("Cache-Control", "private, no-cache, no-store, must-revalidate");
  res.header("Expires", "-1");
  res.header("Pragma", "no-cache");
  next();
}
app.use(nocache);

// Route pertaining to index file
app.use("/", require("./routes/index"));
//route pertaining to users file
app.use("/users", require("./routes/users"));
//route pertaining to article file
app.use("/", require("./routes/article"));

// Route static assets
app.use(express.static(path.join(__dirname, "assets")));

// Run on a production port or on localhost port 30000
const PORT = process.env.PORT || 3000;
app.listen(PORT, console.log(`server started on port ${PORT}`));

app.use((req, res, next) => {
  res.status(404);
  res.send("404: File Not Found");
  next()
});