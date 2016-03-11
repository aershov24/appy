var passport = require('passport')
  , logger = require('../helpers/logger')
  , jwt     = require('jsonwebtoken')
  , cfg   =   require('../config')
  , UserRepository = require('../models/users')
  , User = new UserRepository();

length = function(it){
    return it.length;
  };

exports.localAuth = function(req, username, password, done) {
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

exports.facebookAuth = function(req, accessToken, refreshToken, profile, done){
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
          user.facebook.accessToken = accessToken;
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
            newUser.facebook.accessToken = accessToken;
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
            user.facebook.accessToken = accessToken;
            User.update(user, function(err, result){
              if (err) return done(err, null);
              return done(null, user);
            });
          }
        });
    }
  });
};

exports.linkedinAuth = function(req, accessToken, refreshToken, profile, done){
  process.nextTick(function(){
    // linking accounta
    logger.debug('state: ', req.query);
    var userInfo = JSON.parse(req.query.state);
    if (userInfo.flag == 'true')
    {
      logger.debug('Linked user: ', userInfo);
      logger.debug('Linked accessToken: ', accessToken);
      // linking acoounts and return to profile page
      User.getById(User.getObjectId(userInfo.userId), 
        function(err, user){
          if (err) return done(err, null);
          logger.debug('Current user: ', user);
          user.linkedin = profile;
          user.linkedin.accessToken = accessToken;
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
      //logger.debug("LinkedIn profile: ", JSON.stringify(profile, null, 2));
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
              linkedin: profile,
              username:  profile.name.givenName+profile.name.familyName,
              name: profile.name.givenName+' '+profile.name.familyName,
              email: profile.emails[0].value
            };

            newUser.linkedin.accessToken = accessToken;
            logger.debug("New LinkedIn User: ", newUser);
            //user has authenticated correctly thus we create a JWT token 

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

exports.twitterAuth = function(req, accessToken, accessTokenSecret, profile, done){
  process.nextTick(function(){
    logger.debug(accessToken);
    logger.debug(accessTokenSecret);
    // linking accounta
    if (req.session.user)
    {
      // linking acoounts and return to profile page
      User.getById(User.getObjectId(req.session.user.userId), 
        function(err, user){
          if (err) return done(err, null);
          user.token = req.session.user.userToken;
          user.twitter = profile;
          user.twitter.accessTokenKey = accessToken;
          user.twitter.accessTokenSecret = accessTokenSecret;
          User.update(user, function(err, result){
            if (err) return done(err, null);
            return done(null, user);
          });
      });
    }
  });
};

exports.instagramAuth = function(req, accessToken, accessTokenSecret, profile, done){
  process.nextTick(function(){
    logger.debug(accessToken);
    if (req.query.state){
      var userInfo = JSON.parse(req.query.state);
      logger.debug('User info: ', userInfo);
      logger.debug('Instagram accessToken: ', accessToken);
      // linking acoounts and return to profile page
      User.getById(User.getObjectId(userInfo.userId), 
        function(err, user){
          if (err) return done(err, null);
          logger.debug('Current user: ', user);
          user.instagram = profile;
          user.instagram.accessToken = accessToken;
          user.token = userInfo.userToken;
          logger.debug('token from info: ', user.token);
          User.update(user, function(err, result){
            if (err) return done(err, null);
            logger.debug('auth user with token:', user);
            return done(null, user);
          });
      });
    }
  });
};

exports.foursquareAuth = function(req, accessToken, accessTokenSecret, profile, done){
  process.nextTick(function(){
    logger.debug('token: ', accessToken);
    if (req.query.state){
      var userInfo = JSON.parse(req.query.state);
      logger.debug('User info: ', userInfo);
      logger.debug('Foursquare accessToken: ', accessToken);
      // linking acoounts and return to profile page
      User.getById(User.getObjectId(userInfo.userId), 
        function(err, user){
          if (err) return done(err, null);
          logger.debug('Current user: ', user);
          user.foursquare = profile;
          user.foursquare.accessToken = accessToken;
          user.token = userInfo.userToken;
          logger.debug('token from info: ', user.token);
          User.update(user, function(err, result){
            if (err) return done(err, null);
            logger.debug('auth user with token:', user);
            return done(null, user);
          });
      });
    }
    // user authentification
    else
    {
      logger.debug("Foursquare profile: ", JSON.stringify(profile, null, 2));
      User.FindByFoursquareId(profile.id, 
        function (err, user){
          if (err)
          {
            logger.error(err);
            return done(err, false);
          }

          logger.debug("Founded User: ", user);
          if (!user){
            var newUser = {
              foursquare: profile,
              username:  profile.name.givenName+profile.name.familyName,
              name: profile.name.givenName+' '+profile.name.familyName,
              email: profile.emails[0].value
            };

            newUser.foursquare.accessToken = accessToken;
            logger.debug("New Foursquare User: ", newUser);

            User.AddUser(newUser, function(err, user){
              if (err) return done(err, null);
              logger.debug('User created with Foursquare: %s', profile.id);
              logger.debug(user);
              return done(null, user);
            });
          }
          else{
            logger.debug('User with Foursquare existed: ', profile.id);
            return done(null, user);
          }
      });
    }
  });
};

exports.googleAuth = function(req, accessToken, accessTokenSecret, profile, done){
  process.nextTick(function(){
    logger.debug(accessToken);
    if (req.query.state){
      var userInfo = JSON.parse(req.query.state);
      logger.debug('User info: ', userInfo);
      logger.debug('Google accessToken: ', accessToken);
      // linking acoounts and return to profile page
      User.getById(User.getObjectId(userInfo.userId), 
        function(err, user){
          if (err) return done(err, null);
          logger.debug('Current user: ', user);
          user.google = profile;
          user.google.accessToken = accessToken;
          user.token = userInfo.userToken;
          logger.debug('token from info: ', user.token);
          User.update(user, function(err, result){
            if (err) return done(err, null);
            logger.debug('auth user with token:', user);
            return done(null, user);
          });
      });
    }
  });
};

exports.vkAuth = function(req, accessToken, accessTokenSecret, params, profile, done){
  process.nextTick(function(){
    logger.debug(accessToken);
    if (req.query.state){
      var userInfo = JSON.parse(req.query.state);
      logger.debug('User info: ', userInfo);
      logger.debug('Vk accessToken: ', accessToken);
      logger.debug('Vk params: ', params);
      // linking acoounts and return to profile page
      User.getById(User.getObjectId(userInfo.userId), 
        function(err, user){
          if (err) return done(err, null);
          logger.debug('Current user: ', user);
          user.vkontakte = profile;
          user.vkontakte.accessToken = accessToken;
          user.vkontakte.params = params;
          user.token = userInfo.userToken;
          logger.debug('token from info: ', user.token);
          User.update(user, function(err, result){
            if (err) return done(err, null);
            logger.debug('auth user with token:', user);
            return done(null, user);
          });
      });
    }
  });
};
