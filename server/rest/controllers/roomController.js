// room controller routes
const express = require('express');
const router = express.Router();
const Room = require('../models/Room');
const bodyParser = require('body-parser');
const Chat = require('../models/Chat');
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());


router.post('/channelCreate', async (req, res, next) => {
  const  channelInfo = {
    creator: req.body.creator,
    room_name: req.body.room_name
  };

  const room = new Room(channelInfo);
  await room.save();
  res.json(room);
  next();
});

// post /api/chat/
router.get('/allChannel',async (req,res) => {

  await Room.find({}, (err, chat) =>{
    res.json(chat);
  });
});

router.get('/uniqueChannel', async(req, res) => {

  const idChat = {
    _id: req.headers._id,
  };

    await  Chat.find({room:idChat._id }).sort({__id:'desc'}).exec(async (err, data)  => {
      await  Room.findOne({'_id': idChat._id}, (err, chat) =>{
    res.json([chat, data]);
  });
  });

});

module.exports = router;
