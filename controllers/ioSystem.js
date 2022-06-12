const socketIo = require('socket.io');

const Chat= require("../modeller/chat");

const users = [];

let io;

// få index til user fra array med bruk av socket id
function getUserIndex(socket) {
    let user;

    for(let i = 0; i < users.length; i++) {
        if(user) {
            break;
        }

        if(users[i].id === socket.id) {
            user = {
                index: i
            };
        }
    }

    return user;
}

// få user fra array med bruk av socket id
function getUser(socket) {
    let user;

    for(let i = 0; i < users.length; i++) {
        if(user) {
            break;
        }

        if(users[i].id === socket.id) {
            user = users[i];
        }
    }

    return user;
}

function addUser(username, room, id) {
    users.push({
        username: username,
        room: room,
        id: id
    });
}

// koble socket
function connect(server) {
    // koble socket til server
    io = socketIo(server);

    io.on('connection', (socket) => {
        // gjøre user medlem av ett rom
        socket.on("join room", (room, username) => {
            let user = null;

            // få user sin plass i array hvis det allerede er users
            if(users.length) {
                user = getUserIndex(socket);
            }

            // erstatte user med oppdatert rom hvis user allerede eksisterer
            if(user) {
                let currUser;

                // slett user fra array med bruk av index
                users.splice(user.index, 1);

                // legg til user i array
                addUser(username, room, socket.id);

                // få den nyeste lagte user i array
                currUser = users[users.length - 1];

                // koble user til rom hvis socket tilhører den user
                if(currUser.id === socket.id) {
                    socket.join(room);
                }
            } else {
                let currUser;

                // legg til user i array
                addUser(username, room, socket.id);
                
                // få den nyeste lagte user i array
                currUser = users[users.length - 1];

                // koble user til rom hvis socket tilhører den user
                if(currUser.id === socket.id) {
                    socket.join(room);
                }
            }
        });

        socket.on('send message', async (data) => {
            // få user fra array
            let user = getUser(socket);

            // lage melding hvis user eksisterer
            if(user) {
                const chat = new Chat({
                    msg: data.msg,
                    sender: data.sender,
                    room: user.room
                });
    
                await chat.save();
                
                // bare sende melding til users i samme rom
                io.to(user.room).emit('update message', { messages: await Chat.find({ room: user.room }) });
            }
        });

        socket.on('get messages', async () => {
            let user = getUser(socket);
            
            // få meldinger hvis user eksisterer
            if(user) {
                // bare sende melding til users i samme rom
                io.to(user.room).emit('update message', { messages: await Chat.find({ room: user.room  }) });
            }
        });

        socket.on("disconnect", () => {
            // få bruker index
            let user = getUserIndex(socket);

            // slett bruker fra array hvis bruker eksisterer
            if(user) {
                users.splice(user.index, 1);
            }
        })
    });
}

module.exports = {
    connect: connect
}