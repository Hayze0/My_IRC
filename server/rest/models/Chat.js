const mongoose = require('mongoose'),
Schema = mongoose.Schema;
const {io} = require('../server');




const ChatSchema = mongoose.Schema({

    room: {
        type: Schema.Types.ObjectId,
        ref: 'Room'
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    username: {type: String, required: true},

    message: {type: String, required: true},

    created_at: {type: Date, default: Date.now},


});
const Chat = mongoose.model('Chat', ChatSchema);

module.exports = Chat;

    io.on('connection', function(socket) {
        socket.emit('connection', 'Welcome to the room');
        console.log('a user connected' + socket.id);
        socket.on('room', (chat) => {
            socket.join(chat);
            console.log('u joind channel '+ chat);
            socket.on('message', async (msg) => {
                const message = JSON.parse(msg);
             await   Chat.create({
                    message: message.message.content,
                    username: message.message.username,
                    room: chat
                },async (err, data)=>{
                 await  io.to(chat).emit('serverMessage', data);
             });
            });

        });
    });





