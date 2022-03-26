const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const req = require('express/lib/request');
// Load user model
const User = require('../models/User');

function localStrategy(passport) {
    passport.use(new LocalStrategy({ usernameField: 'fullname', passwordField: 'password' }, (fullname, password, done) => {

        User.findOne({
            where: {
                fullname
            },
        })
        .then(user => {
            if (!user) {
                console.log("No User Found")
                return done(null, false, { message: 'No User Found' });
            }
            // else if(user.verified !== true) {
            //     return done(null, false, {message: 'Email Not Verified'})
            // }
            // Match password
            bcrypt.compare(password, user.password, (err, isMatch) => {
                if (err) throw err;
                if (isMatch) {
                    console.log("Login Success")
                    return done(null, user);
                } else {
                    console.log("Password incorrect")
                    return done(null, false, { message: 'Password incorrect' });
                }
            })
        })
    }));

    // Serializes (stores) user id into session upon successful
    // authentication

    passport.serializeUser((user, done) => {
        done(null, user.id); // user.id is used to identify authenticated user
    });

    // User object is retrieved by userId from session and
    // put into req.user
    passport.deserializeUser((userId, done) => {
        User.findByPk(userId, {raw: true })
            .then((user) => {
                done(null, user); // user object saved in req.session
            })
            .catch((done) => { // No user found, not stored in req.session
                console.log(done);
            });
    });
}
module.exports = { localStrategy };