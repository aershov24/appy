var 
  exp = require('express')
  ,passport = require('passport')
  ,logger = require('../helpers/logger.js')
  ,router = exp.Router();

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
router.get('/facebook/callback', passport.authenticate('facebook', {
  successRedirect: '/',
  failureRedirect: '/'
}), function(req, res){
  return res.redirect('/');
});

module.exports = router;