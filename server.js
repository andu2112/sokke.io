const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const mongoose= require(`mongoose`)
const env=require("dotenv").config();
const 
const port = process.env.PORT || 3500;

const url= process.env.ASS
moongose.connect(url)
.then(()=>{
  console.log("dea")
})
.catch((err)=>{
  console.log(err)
})



app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});


io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('chat message', msg => {
    io.emit('chat message', msg);
  });
});

http.listen(port, () => {
  console.log(` http://localhost:${port}/`);
});



