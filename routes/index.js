const express = require("express");
const path = require("path");

const middleware = require("../middleware/index.js");

const router = express.Router();

router.get('/', middleware.isLoggedIn, (req, res) => {
    res.render("index", { title: "Chats" });
});

module.exports = router;