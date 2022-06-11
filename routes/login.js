const express = require("express");
const passport= require("passport");
const path = require("path");

const middleware = require("../middleware/index.js");

const router = express.Router();

router.get('/login', middleware.isLoggedOut, (req, res) => {
  res.render("login", { title: "Login" });
});

router.post('/login', middleware.isLoggedOut, (req, res, next) => {
  passport.authenticate("local", {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
  })(req, res, next);
});

module.exports = router;