var express = require('express')
  , router = express.Router()
  , logger = require('../helpers/logger.js')
  , logger = require('../helpers/logger.js')
  , cache = require('../helpers/cache.js')
  , decoder = require('../helpers/decoder.js')
  , customMw = require('../middlewares/middleware.js')
  //, User    = require('../models/users.js')
  , UserRepository  = require('../models/users')
  , User = new UserRepository()
  , cfg   =   require('../config.js')
  , acl = require('../helpers/acl.js')
  , passport = require('passport');
  
/**
 * @api {get} /users/login Render login page
 * @apiName UserLogin
 * @apiGroup User
 */
router.get('/login', function(req, res) {
  res.render('login');
});

/**
 * @api {get} /users/getUserInfo Get user info by token
 * @apiName GetUserInfo
 * @apiGroup User
 */
router.get('/getUserInfo', customMw.isAuthentificated, function(req, res) {
  res.json({ user : req.user });
});

/**
 * @api {get} /users/getUserInfo Get user info by token
 * @apiName GetUserInfo
 * @apiGroup User
 */
router.get('/updateUser', customMw.isAuthentificated, function(req, res) {
  var user = req.user;
  user.email = user.email+'1';
  User.update(user, function(err, result){
    if (err) { return res.json({ error: err });  }
    res.json({ result : result });
  });
});

/**
 * @api {get} /users/unlinkFacebook/:userId Unlink Facebook account
 * @apiName UnlinkFacebookAccount
 * @apiGroup User
 */
router.get('/unlinkFacebook/:userId', customMw.isAuthentificated, function(req, res) {
  User.getById(User.getObjectId(req.params.userId), function(err, user){
    if (err) { return res.json({ error: err });  }
    user.facebook = null;
    User.update(user, function(err, result){
      if (err) { return res.json({ error: err });  }
      res.json({ result : result });
    });
  });
});

/**
 * @api {get} /users/unlinkLinkedIn/:userId Unlink LinkedIn account
 * @apiName UnlinkLinkedInAccount
 * @apiGroup User
 */
router.get('/unlinkLinkedIn/:userId', customMw.isAuthentificated, function(req, res) {
  User.getById(User.getObjectId(req.params.userId), function(err, user){
    if (err) { return res.json({ error: err });  }
    user.linkedin = null;
    User.update(user, function(err, result){
      if (err) { return res.json({ error: err });  }
      res.json({ result : result });
    });
  });
});

/**
 * @api {get} /users/unlinkTwitter/:userId Unlink Twitter account
 * @apiName UnlinkTwitterAccount
 * @apiGroup User
 */
router.get('/unlinkTwitter/:userId', customMw.isAuthentificated, function(req, res) {
  User.getById(User.getObjectId(req.params.userId), function(err, user){
    if (err) { return res.json({ error: err });  }
    user.twitter = null;
    User.update(user, function(err, result){
      if (err) { return res.json({ error: err });  }
      res.json({ result : result });
    });
  });
});

/**
 * @api {get} /users/profile Render profile page
 * @apiName UserProfile
 * @apiGroup User
 */
router.get('/profile', customMw.isAuthentificated, function(req, res) {
  res.render('profile', { user : req.user });
});

router.get('/signup', function(req, res) {
  res.render('signup');
});

/**
 * @api {get} /users/logout Logout from current session
 * @apiName UserLogout
 * @apiGroup User
 */
router.get('/logout', customMw.isAuthentificated, function(req, res) {
  // TODO: implement token blacklist for logout users
});

module.exports = router;