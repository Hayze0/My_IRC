const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/Users');
const JWTstrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;

passport.use('login', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',

}, async (email, password, done) => {
    try {
        const user = await User.findOne({email}).then(async user => {
            if (!user) {
                return done(null, false, {message: 'User not found'});
            }
            const validate = await user.isValidatePassword(password);
            if (!validate) {
                return done(null, false, {message: 'Wrong Password'});
            }
            return done(null, user, {message: 'Logged in Successfully'});
        });
    } catch (error) {
        return done(error);
    }
}));
passport.use(new JWTstrategy({
    secretOrKey: 'top_secret',
    jwtFromRequest : ExtractJWT.fromAuthHeaderAsBearerToken()
}, async (token, done) => {
    try {
        return await done(null, token.user);
    } catch (error){
        done(error);
    }
    }
));

