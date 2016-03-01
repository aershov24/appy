var exp = require('express')
  , passport = require('passport')
  , logger = require('../helpers/logger.js')
  , mailer = require('../helpers/mailer.js')
  , cfg   =   require('../config.js')
  , jwt     = require('jsonwebtoken')
  , UserRepository  = require('../models/users')
  , User = new UserRepository()
  , customMw = require('../middlewares/middleware.js')
  , router = exp.Router();

var User = new UserRepository();

/**
 * @api {get} /auth/twitter/link Link Twitter account 
 * @apiName AuthTwitter
 * @apiGroup Authentication
 */
router.get('/twitter/link', customMw.isAuthentificated, 
  function(req, res, next){
    var token = req.body.token || req.query.token || req.headers['x-access-token'];
    logger.debug('Linking twitter account to', req.user);
    req.session.user = {
          userId: User.getIdFromBLOB(req.user._id),
          userToken: token
        };
    passport.authenticate('twitter')(req, res, next);
  });

/**
 * @api {get} /auth/facebook/link Link Facebook account 
 * @apiName AuthFacebook
 * @apiGroup Authentication
 */
router.get('/facebook/link', customMw.isAuthentificated, 
  function(req, res, next){
     var token = req.body.token || req.query.token || req.headers['x-access-token'];
    logger.debug('Linking facebook account to', req.user);
    passport.authenticate('facebook', {
      scope: ['email', 'user_friends'],
      state: JSON.stringify({
          userId: User.getIdFromBLOB(req.user._id),
          userToken: token
        })
    })(req, res, next);
  });

/**
 * @api {get} /auth/facebook Facebook authentification
 * @apiName AuthFacebook
 * @apiGroup Authentication
 */
router.get('/facebook', passport.authenticate('facebook', {
  scope: ['email', 'user_friends']
}));

/**
 * @api {get} /auth/linkedin/link Link LinkedIn account
 * @apiName LinkLinkedIn
 * @apiGroup Authentication
 */
router.get('/linkedin/link', customMw.isAuthentificated, 
  function(req, res, next){
    var token = req.body.token || req.query.token || req.headers['x-access-token'];
    logger.debug('Linking Linkedin account to', req.user);
    passport.authenticate('linkedin', {
      state: JSON.stringify({
          userId: User.getIdFromBLOB(req.user._id),
          userToken: token
        })
    })(req, res, next);
  });

/**
 * @api {get} /auth/linkedin LinkedIn authentification
 * @apiName AuthFacebook
 * @apiGroup Authentication
 */
router.get('/linkedin',
  passport.authenticate('linkedin', { state: 'SOME STATE'  }),
  function(req, res){
    // The request will be redirected to LinkedIn for authentication, so this
    // function will not be called.
});

/**
 * @api {get} /auth/facebook/callback Facebook authentification callback
 * @apiName AuthFacebookCallback
 * @apiGroup Authentication
 */
router.get('/facebook/callback', 
  /*passport.authenticate('facebook', {
      successRedirect : '/users/profile',
      failureRedirect : '/users/login'
  }));*/
  function(req, res, next){
    passport.authenticate('facebook', function(err, user, info) {
      if (err) return res.json(401, { error: err});
      if (!user) {
        return res.json(401, { error: info });
      }
      if (user.token)
      {
        logger.debug('User token exists: ', user.token);
        res.redirect('/users/profile?token='+user.token);
      }
      else
      {
        //user has authenticated correctly thus we create a JWT token 
        var token = jwt.sign(user._id, cfg.JSONToken.secret, {
          expiresIn: cfg.JSONToken.expires
        });
        //return res.json({ token : token, expires: cfg.JSONToken.expires });
        res.redirect('/users/profile?token='+token);
      }
    })(req, res, next);
  }
);

/**
 * @api {get} /auth/linkedin/callback LinkedIn authentification callback
 * @apiName AuthLinkedInCallback
 * @apiGroup Authentication
 */
router.get('/linkedin/callback', function(req, res, next){
  passport.authenticate('linkedin', function(err, user, info) {
    if (err) return res.json({ error: err});
    if (!user) {
      return res.json({ error: info });
    }
    if (user.token)
    {
      logger.debug('User token exists: ', user.token);
      res.redirect('/users/profile?token='+user.token);
    }
    else
    {
      //user has authenticated correctly thus we create a JWT token 
      var token = jwt.sign(user._id, cfg.JSONToken.secret, {
        expiresIn: cfg.JSONToken.expires
      });
      //return res.json({ token : token, expires: cfg.JSONToken.expires });
      res.redirect('/users/profile?token='+token);
    }
  })(req, res, next);
});

/**
 * @api {get} /auth/linkedin/callback LinkedIn authentification callback
 * @apiName AuthLinkedInCallback
 * @apiGroup Authentication
 */
router.get('/twitter/callback', function(req, res, next){
  logger.debug('twitter callback');
  passport.authenticate('twitter', function(err, user, info) {
    if (err) return res.json({ error: err});
    if (!user) {
      return res.json({ error: info });
    }
    if (user.token)
    {
      logger.debug('User token exists: ', user.token);
      res.redirect('/users/profile?token='+user.token);
    }
  })(req, res, next);
});

/**
 * @api {get} /auth/login Local (username, email) authentification
 * @apiName AuthLogin
 * @apiGroup Authentication
 */
router.post('/login', function(req, res, next){
  passport.authenticate('local', function(err, user, info) {
    if (err) { return next(err); }
    if (!user) {
      return res.json(401, { error: info });
    }
    logger.debug(JSON.stringify(user, null, 2));
    //user has authenticated correctly thus we create a JWT token 
    var token = jwt.sign(user._id, cfg.JSONToken.secret, {
      expiresIn: cfg.JSONToken.expires
    });
    //return res.json({ token : token, expires: cfg.JSONToken.expires });
    logger.debug('/users/profile?token='+token);
    return res.redirect('/users/profile?token='+token);
  })(req, res, next);
});

/**
 * @api {get} /auth/signup User signup using username, email and password
 * @apiName AuthSignup
 * @apiGroup Authentication
 */
router.post('/signup', function(req, res) { 
  var newUser = {
    username: req.body.username,
    email: req.body.email,
    password: req.body.password
  };

  User.AddUser(newUser, function(err, user){
    if (err) return res.send({ error: err});
    //user has authenticated correctly thus we create a JWT token 
    var token = jwt.sign(user._id, cfg.JSONToken.secret, {
      expiresIn: cfg.JSONToken.expires
    });

    mailer.sendWelcomeEmail(user, function(err, body){
      if (err) 
        logger.error('Cant send register email: %s', err);
      //return res.json({ token : token, expires: cfg.JSONToken.expires });
      res.redirect('/users/profile?token='+token);
    });
  });
});

module.exports = router;