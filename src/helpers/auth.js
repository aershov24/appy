var passport = require('passport')
  , FacebookStrategy = require('passport-facebook').Strategy
  , logger = require('../helpers/logger')
  , jwt     = require('jsonwebtoken')
  , cfg   =   require('../config')
  , UserRepository = require('../models/users')
  , User = new UserRepository();

length = function(it){
    return it.length;
  };

localAuth = function(req, username, password, done) {
  process.nextTick(function() {
    logger.debug("Local authentification...");
    logger.debug("Username: %s", username);
    logger.debug("Password: %s", password);
    User.GetUserByUsername(username, function(err, user){
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

facebookAuth = function(req, accessToken, refreshToken, profile, done){
  process.nextTick(function(){
    // linking accounta
    if (req.query.state)
    {
      var userInfo = JSON.parse(req.query.state);
      logger.debug('Linked user: ', userInfo);
      // linking acoounts and return to profile page
      User.getById(User.getObjectId(userInfo.userId), 
        function(err, user){
          if (err) return done(err, null);
          logger.debug('Current user: ', user);
          user.facebook = profile;
          user.token = userInfo.token;
          User.update(user, function(err, result){
            if (err) return done(err, null);
            return done(null, user);
          });
      });
    }
    // user authentification
    else
    {
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
              facebook: profile,
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
    }
  });
};

linkedinAuth = function(req, accessToken, refreshToken, profile, done){
  process.nextTick(function(){
  // linking accounta
    if (req.query.state)
    {
      var userInfo = JSON.parse(req.query.state);
      logger.debug('Linked user: ', userInfo);
      // linking acoounts and return to profile page
      User.getById(User.getObjectId(userInfo.userId), 
        function(err, user){
          if (err) return done(err, null);
          logger.debug('Current user: ', user);
          user.linkedin = profile;
          user.token = userInfo.token;
          User.update(user, function(err, result){
            if (err) return done(err, null);
            return done(null, user);
          });
      });
    }
    // user authentification
    else
    {
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
              linkedin: profile
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
    }
  });
};

twitterAuth = function(req, accessToken, refreshToken, profile, done){
  process.nextTick(function(){
    // linking accounta
    if (req.session.user)
    {
      // linking acoounts and return to profile page
      User.getById(User.getObjectId(req.session.user.userId), 
        function(err, user){
          if (err) return done(err, null);
          user.token = req.session.user.userToken;
          user.twitter = profile;
          User.update(user, function(err, result){
            if (err) return done(err, null);
            return done(null, user);
          });
      });
    }
  });
};

  
exports.localAuth = localAuth;
exports.facebookAuth = facebookAuth;
exports.linkedinAuth = linkedinAuth;
exports.twitterAuth = twitterAuth;