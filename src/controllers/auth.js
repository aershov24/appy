var exp = require('express')
  , passport = require('passport')
  , logger = require('../helpers/logger.js')
  , cfg   =   require('../config.js')
  , jwt     = require('jsonwebtoken')
  , User = require('../models/users.js')
  , router = exp.Router();

/**
 * @api {get} /auth/facebook Facebook authentification
 * @apiName AuthFacebook
 * @apiGroup User
 */
router.get('/facebook', passport.authenticate('facebook', {
  scope: ['email', 'user_friends']
}));

/**
 * @api {get} /auth/facebook/callback Facebook authentification callback
 * @apiName AuthFacebookaCallback
 * @apiGroup User
 */
router.get('/facebook/callback', function(req, res, next){
  passport.authenticate('facebook', function(err, user, info) {
    if (err) return res.json(401, { error: err});
    if (!user) {
      return res.json(401, { error: info });
    }
    //user has authenticated correctly thus we create a JWT token 
    var token = jwt.sign(user, cfg.secret, {
      expiresIn: 10*60*6 // expires in 10 minutes
    });
    res.json({ token : token });
  })(req, res, next);
});

router.post('/login', function(req, res, next){
  passport.authenticate('local', function(err, user, info) {
    if (err) { return next(err); }
    if (!user) {
      return res.json(401, { error: info });
    }
    //user has authenticated correctly thus we create a JWT token 
    var token = jwt.sign(user, cfg.secret, {
      expiresIn: 10*60*6 // expires in 10 minutes
    });
    res.json({ token : token });

  })(req, res, next);
});

router.post('/signup', function(req, res) { 
  var newUser = {
    username: req.body.username,
    email: req.body.email,
    password: req.body.password
  };

  User.AddUser(newUser, function(err, user){
    if (err) res.send({error: err});
     //user has authenticated correctly thus we create a JWT token 
    var token = jwt.sign(user, cfg.secret, {
      expiresIn: 10*60*6 // expires in 10 minutes
    });
    res.json({ token : token });
  });
});

module.exports = router;