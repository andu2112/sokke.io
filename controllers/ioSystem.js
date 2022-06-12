const socketIo = require('socket.io');

const Chat= require("../modeller/chat");

const users = [];

let io;

function connect(server) {
    io = socketIo(server);

    io.on('connection', (socket) => {
        socket.on("join room", (room, username) => {
            let user = null;

            if(users.length) {
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
            }
            if(user) {
                let currUser;

                users.splice(user.index, 1);
                
                users.push({
                    username: username,
                    room: room,
                    id: socket.id
                });

                currUser = users[users.length - 1];

                if(userCurr.id === socket.id) {
                    socket.join(room);
                }
            } else {
                let currUser;

                users.push({
                    username: username,
                    room: room,
                    id: socket.id
                });
                
                currUser = users[users.length - 1];

                if(userCurr.id === socket.id) {
                    socket.join(room);
                }
            }
        });

        socket.on('send message', async (data) => {
            let user = null;

            for(let i = 0; i < users.length; i++) {
                if(user) {
                    break;
                }

                if(users[i].id === socket.id) {
                    user = users[i];
                }
            }

            if(user) {
                const chat = new Chat({
                    msg: data.msg,
                    sender: data.sender,
                    room: user.room
                });
    
                await chat.save();
                
                io.to(user.room).emit('update message', { messages: await Chat.find({ room: user.room }) });
            }
        });

        socket.on('get messages', async () => {
            let user = null;

            for(let i = 0; i < users.length; i++) {
                if(user) {
                    break;
                }
                if(users[i].id === socket.id) {
                    user = users[i];
                }
            }
            if(user) {
                io.to(user.room).emit('update message', { messages: await Chat.find({ room: user.room  }) });
            }
        });

        socket.on("disconnect", () => {
            let user = null;

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

            if(user) {
                users.splice(user.index, 1);
            }
        })
    });
}

module.exports = {
    connect: connect
}
