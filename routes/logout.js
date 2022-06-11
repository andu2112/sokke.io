const express = require("express");
const passport= require("passport");

const middleware = require("../middleware/index.js");

const router = express.Router();

router.get('/logout', middleware.isLoggedIn, (req, res) => {
  req.logout((err) => {
    if(err) {
        console.log(err);
        res.redirect("/");
    } else {
        req.flash('successMsg', 'You have been logged out.');
        res.redirect('/login');
    }
  });
});

module.exports = router;