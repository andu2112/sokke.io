require("dotenv").config();

const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const passport= require("passport");
const session = require("express-session");
const flash = require("connect-flash");
const mongoose= require(`mongoose`);
const path = require('path');

const Chat= require("./modeller/chat");
const User= require("./modeller/user");

const app = express(); 
const server = http.Server(app);
const io = socketIo(server);

const port = process.env.PORT || 3500;

const url= process.env.MONGO_URL;

mongoose.connect(url)
  .then(()=>{
    console.log("dea")
  })
  .catch((err)=>{
    console.log(err)
  })

app.set("view engine", "ejs");

app.use('/public', express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));

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

app.use((req, res, next) => {
  res.locals.error = req.flash('error');
  res.locals.errorMsg = req.flash('errorMsg');
  res.locals.successMsg = req.flash('successMsg');
  res.locals.user = req.user;

  next();
});

app.use(require('./routes/index.js'));
app.use(require('./routes/login.js'));
app.use(require('./routes/signup.js'));
app.use(require('./routes/logout.js'));

io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('send message', async (data) => {
    const chat = new Chat({
      msg: data.msg,
      sender: data.sender
    });

    await chat.save();

    io.emit('update message', { messages: await Chat.find() });
  });

  socket.on('get messages', async () => {
    console.log('success')
    io.emit('update message', { messages: await Chat.find() });
  });
});

server.listen(port, () => {
  console.log(` http://localhost:${port}/`);
});