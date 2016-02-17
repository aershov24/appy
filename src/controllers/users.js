var express = require('express')
  , router = express.Router()
  , logger = require('../helpers/logger.js')
  , customMw = require('../middlewares/middleware.js')
  , User    = require('../models/users.js')
  , jwt     = require('jsonwebtoken')
  , passport = require('passport');

router.get('/login', function(req, res) {
  res.render('login');
});

router.get('/profile', function(req, res) {
  res.render('profile');
});

router.get('/signup', function(req, res) {
  res.render('signup');
});

router.post('/login', 
  passport.authenticate('local', { failureRedirect: '/users/login' }),
  function(req, res) {
    res.send({result: 'auth ok'});
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