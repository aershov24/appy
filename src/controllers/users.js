var express = require('express')
  , router = express.Router()
  , logger = require('../helpers/logger.js')
  , customMw = require('../middlewares/middleware.js')
  , User    = require('../models/users.js')
  , jwt     = require('jsonwebtoken')
  , cfg   =   require('../config.js')
  , passport = require('passport');

router.get('/login', function(req, res) {
  res.render('login');
});

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
    logger.debug('New user added: %j', user);
    // todo render profile page
    //var token = jwt.sign(user, cfg.secret, {
    //  expiresIn: 10*60 // expires in 10 minutes
    //});

    // return the information including token as JSON
    //res.json({
    //  success: true,
    //  message: 'User authentificated',
    //  token: token
    //});
    res.send(user);
  });
});

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