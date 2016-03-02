var exp = require('express')
  , passport = require('passport')
  , customMw = require('../middlewares/middleware.js')
  , cfg   =   require('../config.js')
  , UserRepository  = require('../models/users')
  , User = new UserRepository()
  , logger = require('../helpers/logger.js')
  , mailer = require('../helpers/mailer.js')
  , smssender = require('../helpers/smssender.js')
  , decoder = require('../helpers/decoder.js')
  , cache = require('../helpers/cache.js')
  , facebook = require('../helpers/facebook.js')
  , router = exp.Router();

/**
 * @api {get} /messages/postOnWall Post message on a user's Facebook wall
 * @apiName FacebookPostOnWall
 * @apiGroup Messages
 */
router.post('/facebook/postOnWall', 
  customMw.isAuthentificated, 
  function(req, res) {
    logger.debug('Post on facebook');
    facebook.postMessage(req.body.accessToken, req.body.message, function(err, body){
      if (err) return res.json({error: err});
      logger.debug(body);
      return res.json({message: body});
    });
});

module.exports = router;