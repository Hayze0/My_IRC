const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/My_IrcDB', { useNewUrlParser: true });
mongoose.set('debug', true);
const db = mongoose.connection;
mongoose.Promise = global.Promise;
db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function() {
});
const bcrypt  = require('bcrypt');
const io = require('../server').io;

var UsersSchema = new mongoose.Schema({
  username:  {type: String,
    required : true,
    unique : true},
  email: {type: String,
    required : true,
    unique : true} ,
  password: {type: String,
    required : true
  },
  phone: {type: Number},
  age:  {type: Number},
  sex: {type: String},
  token: {type: String},
  created_at: {type: Date, default: Date.now},
  updated_at: {type: Date, default: Date.now}
});


UsersSchema.pre('save' , async function (next) {
  const user = this;
  this.password = await bcrypt.hash(user.password, 10);
  next();
});


UsersSchema.methods.isValidatePassword = async function(password){
  const user = this;
  return  bcrypt.compare(password, user.password);
};

const  userCollection = mongoose.model('User', UsersSchema);
module.exports =  userCollection;


