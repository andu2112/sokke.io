const socket = io();

const messages = document.getElementById('messages');
const form = document.getElementById('form');
const input = document.getElementById('input');
const username = document.getElementById('username');

function retro(data) {
  messages.innerHTML = "";

  data.messages.forEach((data)=>{
    messages.innerHTML += `
      <tr>
        <td>${data.sender}: ${data.msg}</td>
      </tr>
    `;
  });

  window.scrollTo(0, document.body.scrollHeight);
}

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

socket.on('update message', retro);

socket.emit('get messages');