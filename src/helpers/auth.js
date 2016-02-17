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
        return done(null, false, {message: "The user is not exist"});
      }
      else 
        User.ValidatePassword(password, user.password, function(err, result){
          if (result == true)
          {
            logger.debug("User authentificated");
            // create json token and save it with user
            //var token = jwt.sign(user, cfg.secret, {
            //  expiresIn: 10*60 // expires in 10 minutes
            //});
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
    logger.debug('Facebook authentification...');
    if (length(profile.emails) !== 0) {
      logger.debug("Facebook profile: ", JSON.stringify(profile, null, 2));
      User.FindByEmail(profile.emails[0].value, 
        function (err, users){
          if (!err){
            if (users == null){
              // create new user
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

              User.AddUser(newUser, function(err, user){
                if (!err){
                  // TODO add token
                  //var token = jwt.sign(user, cfg.secret, {
                  //  expiresIn: 10*60 // expires in 10 minutes
                  //});
                  logger.debug('User authentificated');
                  return done(null, profile);
                }
                else{
                  logger.error('Error create user'+ err);
                  return done(null, profile);
                }
              });
            }
            else{
              // TODO: add token
              //var token = jwt.sign(user, cfg.secret, {
              //  expiresIn: 10*60 // expires in 10 minutes
              //});
              logger.debug('User authentificated: ', users);
              return done(null, profile);
            }
          }
          else{
            logger.warn("Error getting user with email: " + profile.emails[0].value);
            return done(null, profile);
          }
        });
      }
    else {
      logger.warn("Error facebook login: "+ profile);
      return done(null, profile);
    }
    });
};
  
exports.facebookAuth = facebookAuth;
exports.localAuth = localAuth;