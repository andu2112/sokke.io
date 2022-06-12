// koble til socket kobling på klient
const socket = io();

const messages = document.getElementById('messages');
const form = document.getElementById('form');
const input = document.getElementById('input');
const username = document.getElementById('username');
const rooms = document.getElementById('rooms');

// vise meldinger i tabell
socket.on('update message', (data) => {
  messages.innerHTML = "";

  data.messages.forEach((data)=>{
    messages.innerHTML += `
      <tr>
        <td>${data.sender}: ${data.msg}</td>
      </tr>
    `;
  });

  // scroller ned på siden
  window.scrollTo(0, document.body.scrollHeight);
});

window.addEventListener("DOMContentLoaded", () => {
  // koble user til general rom
  socket.emit("join room", "general", username.innerText);
  // hente meldinger
  socket.emit("get messages");
});

rooms.addEventListener('click', (e) => {
  // sjekke om det som blir trykket på er en link
  if(e.target.classList.contains("nav-link")) {
    const linkID = e.target.id;
    // lage array av alle linker på sidebaren
    const links = Array.from(document.getElementsByClassName("nav-link"));

    links.forEach((link)=>{
      // sjekk om link er den samme som den som ble trykket på
      if(linkID == link.id) {
        // oppdater farge til å bli valgt
        link.classList.remove("text-light");
        link.classList.add("text-warning");
      } else {
        // oppdater farge til å bli ikke valgt
        link.classList.remove("text-warning");
        link.classList.add("text-light");
      }
    });

    // koble user til rom som ble trykker på
    socket.emit("join room", linkID, username.innerText);
    // hente meldinger fra riktig rom
    socket.emit("get messages");
  }
});

form.addEventListener('submit', (e) => {
  e.preventDefault();
  
  // sjekk at input ikke er tom
  if (input.value) {
    // send melding
    socket.emit('send message', {
      msg: input.value,
      sender: username.innerText
    });
    // gjøre input tom
    input.value = '';
  }
});