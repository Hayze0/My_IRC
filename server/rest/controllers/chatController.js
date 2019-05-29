// chat controller routes
const express = require('express');
const router = express.Router();
const Chat = require('../models/Chat');
const bodyParser = require('body-parser');
const io = require('socket.io');
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());
// get /api/chat/
router.get('/',(req,res) => {
  res.send('GET response');
});


// post api/sendMessage/
router.post('/sendMessage', async (req, res) => {

});

// put /api/chat/
router.put('/',(req,res) => {
  res.send('PUT response');
});

// delete /api/chat/
router.delete('/',(req,res) => {
  res.send('DELETE response');
});

module.exports = router;
