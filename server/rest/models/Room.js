const mongoose = require('mongoose');
const db = mongoose.connection;
mongoose.Promise = global.Promise;
const Chat = require('./Chat');
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
});
const {io} = require('../server');

const RoomSchema = mongoose.Schema({
    creator: {
        type: String,
        required: true
    },
    room_name:{
        type:String,
    },
    created_date:{
        type: Date,
        default: Date.now
    },
});



module.exports = mongoose.model('Room', RoomSchema);
