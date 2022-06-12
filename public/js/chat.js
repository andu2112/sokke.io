const socket = io();

const messages = document.getElementById('messages');
const form = document.getElementById('form');
const input = document.getElementById('input');
const username = document.getElementById('username');
const rooms = document.getElementById('rooms');

socket.on('update message', (data) => {
  console.log(data);
  messages.innerHTML = "";

  data.messages.forEach((data)=>{
    messages.innerHTML += `
      <tr>
        <td>${data.sender}: ${data.msg}</td>
      </tr>
    `;
  });

  window.scrollTo(0, document.body.scrollHeight);
});

window.addEventListener("DOMContentLoaded", () => {
  socket.emit("join room", "general", username.innerText);
  socket.emit("get messages");
});

rooms.addEventListener('click', (e) => {
  console.log(e.target);
  if(e.target.classList.contains("nav-link")) {
    console.log('if')
    socket.emit("join room", e.target.id, username.innerText);
    socket.emit("get messages");
  }
});

form.addEventListener('submit', (e) => {
  e.preventDefault();
  
  if (input.value) {
    socket.emit('send message', {
      msg: input.value,
      sender: username.innerText
    });
    input.value = '';
  }
});