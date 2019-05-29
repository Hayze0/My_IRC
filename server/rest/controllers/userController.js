// user controller routes
var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const User = require('../models/Users');
require('../auth/auth');
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());


// post /api/user/register
router.post('/register', async function (req, res, next) {

    const user = new User(req.body);
    await user.save();
    res.json({
        message: 'Signup successful',
    });
    next();
});

// post /api/user/login
router.post('/login', async (req, res, next) => {
    passport.authenticate('login',{session: false},async (err, user = req.body, info) => {
        try {
            if(err || !user){
            const error = new Error('An Error occured');
            return next(error);
        }
            req.login(user, { session : false }, async (error) => {
                if( error ) return next(error);
                const body = { _id : user._id, email : user.email };
                const token = jwt.sign({ user : body },'top_secret');
                //Send back the token to the user
            return res.json({
                username: user.username,
                token

            });
        });
        } catch (error) {
        return next(error);
    }
    })(req, res, next);
});




// get /api/user/getusers
router.get('/getusers',(req,res) => {


});

// put /api/user/updateuser
router.put('/updateuser',(req,res) => {
  res.send('put updateuser');
});

// delete /api/user/deleteuser
router.delete('/deleteuser',(req,res) => {
  res.send('delete deleteuser');
});


module.exports = router;
