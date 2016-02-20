var jwt     = require('jsonwebtoken')
  , cfg   =   require('../config.js')
  , logger = require('../helpers/logger.js');

exports.getObjectByToken = function(token, cb) {
  jwt.verify(token, cfg.JSONToken.secret, function(err, object) {
      if (err) return cb(err, null);
      if (!object){ 
        logger.error('Wrong token');
        return cb('Wrong token', null);
      }
      logger.debug('Token decoded: ', object);
      return cb(null, object);
  });
};