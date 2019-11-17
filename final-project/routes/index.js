//bring in dependencies
const express = require("express");
const moment = require("moment");
const router = express.Router();

const { ensureAuthenticated } = require("../config/auth");

// Test the get method
router.get("/", (req, res) => res.render ("welcome"));

// thankyou Page
router.get("/thankyou", ensureAuthenticated, (req, res) => 
res.render ("thankyou", {
  name: req.user.name,
  rawdate: req.user.date,
  //use moment to show current date
  regdate: moment(req.user.date).format("MMMM Do YYYY, h:mm:ss a"),
  nowdate: moment().format("MMMM Do YYYY, h:mm:ss a")
}));

//Unauthenticated link to thankyou
router.get("/thankyou", (req, res) => 
res.render ("thankyou", {
  name: req.user
}));
module.exports = router;