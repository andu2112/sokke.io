const express = require("express");
const path = require("path");

const User= require("../modeller/user");

const middleware = require("../middleware/index.js");

const router = express.Router();

router.get('/signup', middleware.isLoggedOut, (req, res) => {
    res.render("signup", { title: "Signup" });
});
  
router.post('/signup', middleware.isLoggedOut, async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    User.register({ username: username }, password, (err, user) => {
        if(err) {
            // oppdater error melding til error fra mongodb
            req.flash('errorMsg', err.message + '.');
            res.redirect('/signup');
        } else {
            // oppdater success melding på login side
            req.flash('successMsg', 'Account created.');
            res.redirect('/login');
        }
    })
});

module.exports = router;