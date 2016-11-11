import passport from 'passport';
var LocalStrategy = require('passport-local').Strategy;
import mongoose from 'mongoose';
import Admin from '../models/admin';


passport.use(new LocalStrategy({
    usernameField: 'email'
  },
  function(username, password, done) {
    // console.log('username')
    // console.log(username);
    // console.log('password')
    // console.log(password);
    Admin.findOne({ email: username }, function (err, user) {
      if (err) { return done(err); }
      // Return if user not found in database
      if (!user) {
        return done(null, false, {
          message: 'user not found'
        });
      }
      // Return if password is wrong
      if (!user.validPassword(password)) {
        return done(null, false, {
          message: 'Password is wrong'
        });
      }
      // If credentials are correct, return the user object
      return done(null, user);
    });
  }
));
