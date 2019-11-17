//bring in dependencies
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs")
//user model
const User = require("../models/User");
const passport = require("passport");

//  login Page
// get / send a test message
router.get("/login", (req, res) => res.render("login"));

//  Subscription Page
// get / send a test message
router.get("/subscribe", (req, res) => res.render("subscribe"));

// Subscription handle
router.post("/subscribe", (req, res) => {

const name = req.body.name
const email = req.body.email
const password = req.body.password
const password2 = req.body.password2
const adult = Boolean(req.body.adult)

// define errors as an array
let errors = [];
// validating all fields have been filled in
if (!name || !email || !password || !password2) {
  errors.push ({msg: "Please Fill In All Fields"});
}
// validating matching passwords
if (password !== password2) {
  errors.push ({msg: "Passwords Do Not Match"});
}
// validating password lengths
if (password.length < 6) {
  errors.push ({msg: "Password should be at least 6 charachters"});
}

if (errors.length > 0) {
  res.render("subscribe", {
    errors,
    name,
    email,
    password,
    password2
  });

} else {

// Passed validation. check to ensure user doesn't already exist
User.findOne({ email: email })
// returns a promise
.then(user => {
  if(user) {
// if the user exists re-render the register form and show an error message
    errors.push ({msg: "Email Is Already Registered"});
    res.render("subscribe", {
      errors,
      name,
      email,
      password,
      password2
    });
    
  } else {
    const newUser = new User({
      name,
      email,
      password,
      adult
  });
  // using bcrypt, generate a salt so we can create a hash
  bcrypt.genSalt(10, (err, salt) => 
  bcrypt.hash(newUser.password, salt, (err, hash) => {
  if(err) throw err;
  // set password to hashed password
    newUser.password = hash;
    newUser.save()
      .then(user => {

      // show message after redirect. Flash stores message in a session and displays it aftre the redirect
      req.flash("success_msg", "You Are Now Registered And Can Log In");
      res.redirect("/users/login");
      })
     .catch(err => console.log(err));
     })
    );
  }
});
}
});
// Login handle
// authentication documentation at passportjs.org/docs
// implement local strategy
router.post("/login", (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: "/thankyou" ,
    failureRedirect: "/users/login",
    failureFlash: true
  })(req, res, next);
});

// Logout handle, using passport middleware
router.get("/logout", (req, res) => {
  req.logout();
  // send a flash message and redirect
  req.flash("success_msg", "You Are Now Logged Out");
  res.redirect("/users/login");
});
// send this out
module.exports = router;