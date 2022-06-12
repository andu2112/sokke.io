require("dotenv").config();

const express = require('express');
const http = require('http');
const passport= require("passport");
const session = require("express-session");
const flash = require("connect-flash");
const mongoose= require(`mongoose`);
const path = require('path');

const User= require("./modeller/user");

const ioSystem = require("./controllers/ioSystem");

const app = express(); 
const server = http.Server(app);

const port = process.env.PORT || 3500;

const url= process.env.MONGO_URL;

mongoose.connect(url)
  .then(()=>{
    console.log("mongod connected")
  })
  .catch((err)=>{
    console.log(err)
  })

// koble til socket
ioSystem.connect(server);

app.set("view engine", "ejs");

// sett public mappe
app.use('/public', express.static(path.join(__dirname, 'public')));
// bodyparser
app.use(express.urlencoded({ extended: true }));

// bruk flash meldinger
app.use(flash());

app.use(
  session({
    secret: process.env.SESSION,
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

passport.use(User.createStrategy());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// globale variabler brukt aktivt i ejs
app.use((req, res, next) => {
  res.locals.error = req.flash('error');
  res.locals.errorMsg = req.flash('errorMsg');
  res.locals.successMsg = req.flash('successMsg');
  res.locals.user = req.user;

  next();
});

// ruter
app.use(require('./routes/login.js'));
app.use(require('./routes/signup.js'));
app.use(require('./routes/logout.js'));
app.use(require('./routes/index.js'));

server.listen(port, () => {
  console.log(` http://localhost:${port}/`);
});