const LocalStrategy = require("passport-local").Strategy;
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

// Load User model
const User = require("../models/User");
// export the Strategy were creating and pass the passport Object
// through/from the app.js file

module.exports = function(passport) {
  // Passing in the passport to our new strategy.
  passport.use(
    new LocalStrategy({ usernameField: "email" }, (email, password, done) => {
      // Match user to email in db
      User.findOne ({ email: email }) 
        .then(user => {
           if (!user) {
             // if there isn't a match
          return done(null, false, { message: "That Email Is Not Registered." });
        }
        // bcrypt: match hashed password in db with plain text password submitted. isMatch is a boolean
        bcrypt.compare(password, user.password, (err, isMatch) => {
          // error handling
          if (err) throw err;
          // error handling for matched or not
          if (isMatch) {
            // if there is a match
            return done(null, user);
          } else {
            // if there is no match
            return done(null, false, { message: "Password Incorrect" });
          }
        });
      })
      .catch(err => console.log(err));
    })
  )

// Login sessions are created with a cookie stored in the user's browser
// To support login sessions, serialize and deserialize user instances
// to and from the session.

//from passport documentation passportjs.org/docs
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });
  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      done(err, user);
    });
  });
};