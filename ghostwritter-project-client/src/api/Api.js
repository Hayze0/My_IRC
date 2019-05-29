const  ApiUris = {
// URL'S OF BACKEND
  RegisterUri: 'http://localhost:3001/api/user/register',
  LoginUri: 'http://localhost:3001/api/user/login',
  socketUri:'http://localhost:3001',
  chatListUri:'http://localhost:3001/api/user/chat/allChannel',
  createChannelUri:'http://localhost:3001/api/user/chat/channelCreate',
  uniqueChannel: 'http://localhost:3001/api/user/chat/uniqueChannel',
  userToken: localStorage.getItem('token'),
  userName: localStorage.getItem('username'),
  user_Id: localStorage.getItem('_id'),
  chatId: localStorage.getItem('idChat')


};


export default  ApiUris;
