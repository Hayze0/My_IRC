const express     = require('express');
const bodyParser  = require('body-parser');
const app         = express(); // Please do not remove this line, since CLI uses this line as guidance to import new controllers


const server = require('http').createServer(app);
const io = module.exports.io =  require('socket.io').listen(server);
const cors = require('cors');
app.use(cors());
const userController = require('./controllers/userController');
const roomController = require('./controllers/roomController');
const chatControl = require('./controllers/chatController');
const passport = require('passport');
require('./auth/auth');
const secureRoute = require('./controllers/securityController');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/api/user', userController);
app.use('/api/user', passport.authenticate('jwt', { session : false }), secureRoute);
app.use('/api/user/chat', passport.authenticate('jwt', { session : false }),roomController);



server.listen(process.env.PORT || 3001, () => {
  console.log('Server is running on 3001');

});
