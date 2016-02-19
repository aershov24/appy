var express = require('express')
  , router = express.Router()
  , logger = require('../helpers/logger.js')
  , customMw = require('../middlewares/middleware.js')
  , User    = require('../models/users.js')
  , jwt     = require('jsonwebtoken')
  , cfg   =   require('../config.js')
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
  var token = req.body.token || req.query.token || req.headers['x-access-token'];
  User.GetUserByToken(token, function(err, user) {
    if (err) { return next(err); }
    if (!user) {
      return res.json(401, { error: 'No user found' });
    }
    res.json({ user : user });
  });
});

/**
 * @api {get} /users/profile Render profile oage
 * @apiName UserProfile
 * @apiGroup User
 */
router.get('/profile', customMw.isAuthentificated, function(req, res) {
  var token = req.body.token || req.query.token || req.headers['x-access-token'];
  User.GetUserByToken(token, function(err, user) {
    if (err) { return next(err); }
    if (!user) {
      return res.json(401, { error: 'No user found' });
    }
    res.render('profile', { user : user });
  });
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
  req.session.destroy(function(err) {
    if (!err){
      res.redirect('/user/login');
    }
    else {
      logger.warn(err);
      res.redirect('/user/login');
    }
  })
});

module.exports = router;