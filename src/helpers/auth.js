var passport = require('passport')
  , FacebookStrategy = require('passport-facebook').Strategy
  , logger = require('../helpers/logger.js')
  , jwt     = require('jsonwebtoken')
  , cfg   =   require('../config.js')
  , User = require('../models/users.js');

length = function(it){
    return it.length;
  };

localAuth = function(req, username, password, done) {
  process.nextTick(function() {
    logger.debug("Local authentification...");
    logger.debug("Username: %s", username);
    logger.debug("Password: %s", password);
    User.GetUser(username, function(err, user){
      if (err)
      {
        logger.error(err);
        return done(err, null);
      }
      if(!user)
      {
        // if the user is not exist
        logger.debug("The user is not exist");
        return done(null, null, {message: "The user is not exist"});
      }
      else 
        User.ValidatePassword(password, user.password, function(err, result){
          if (result === true)
          {
            logger.debug("User authentificated");
            return done(null, user);
          }
          else
          {
            logger.error("Wrong password");
            return done(null, false, {message: "Wrong password"});
          }
        });
    });
  })
};

facebookAuth = function(rq, accessToken, refreshToken, profile, done){
  process.nextTick(function(){
    logger.debug("Facebook profile: ", JSON.stringify(profile, null, 2));
    User.FindByFacebookId(profile.id, 
      function (err, user){
        if (err)
        {
          logger.error(err);
          return done(err, false);
        }

        logger.debug("Founded User: ", user);
        if (!user){
          var newUser = {
            facebook: {
              id: profile.id,
              username: profile.username,
              displayName: profile.displayName,
              name: {
                  familyName: profile.name.familyName,
                  givenName: profile.name.givenName,
                  middleName: null
              },
              gender: profile.gender,
              profileUrl: profile.profileUrl,
              emails: profile.emails,
            },
            username:  profile.name.givenName+profile.name.familyName,
            name: profile.name.givenName+' '+profile.name.familyName,
            email: profile.emails[0].value
          };

          logger.debug("New Facebook User: ", newUser);

          User.AddUser(newUser, function(err, user){
            if (err) return done(err, null);
            logger.debug('User created with FacebookId: %s', profile.id);
            logger.debug(user);
            return done(null, user);
          });
        }
        else{
          logger.debug('User with FacebookId existed: ', profile.id);
          return done(null, user);
        }
      });
  });
};

linkedinAuth = function(rq, accessToken, refreshToken, profile, done){
  process.nextTick(function(){
    logger.debug("LinkedIn profile: ", JSON.stringify(profile, null, 2));
    User.FindByLinkedinId(profile.id, 
      function (err, user){
        if (err)
        {
          logger.error(err);
          return done(err, false);
        }

        logger.debug("Founded User: ", user);
        if (!user){
          var newUser = {
            linkedin: {
              id: profile.id,
              username: profile.username,
              displayName: profile.displayName,
              name: {
                  familyName: profile.name.familyName,
                  givenName: profile.name.givenName,
                  middleName: null
              },
              gender: profile.gender,
              profileUrl: profile.profileUrl,
              emails: profile.emails,
            },
            username:  profile.name.givenName+profile.name.familyName,
            name: profile.name.givenName+' '+profile.name.familyName,
            email: profile.emails[0].value
          };

          logger.debug("New LinkedIn User: ", newUser);

          User.AddUser(newUser, function(err, user){
            if (err) return done(err, null);
            logger.debug('User created with LinkedIn: %s', profile.id);
            logger.debug(user);
            return done(null, user);
          });
        }
        else{
          logger.debug('User with LinkedIn existed: ', profile.id);
          return done(null, user);
        }
      });
  });
};
  
exports.localAuth = localAuth;
exports.facebookAuth = facebookAuth;
exports.linkedinAuth = linkedinAuth;