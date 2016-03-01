var logger  = require('../helpers/logger.js')
  , path    = require('path')
  , cfg     = require('../config.js')
  , decoder = require('../helpers/decoder.js')
  , cache = require('../helpers/cache.js')
  , acl = require('../helpers/acl.js')
  , resources = require('../models/resources')
  , UserRepository  = require('../models/users')
  , User = new UserRepository()
  , jwt     = require('jsonwebtoken');

exports.isAuthentificated = function(req, res, next){
  var token = req.body.token || req.query.token || req.headers['x-access-token'];
  if (token) {
    decoder.getObjectByToken(token, function(err, id){
      if (err) { return res.json({ error: err });  }
      cache.fetchUser(id, function(err, user) {
        if (err) { return res.json({ error: err });  }
        req.user = user;
        req.user.token = token;
        next();
      });
    });
  } 
  else {
    // respond with html page
    if (req.accepts('html')) {
      logger.debug('isAuth');
      return res.redirect('/users/login')
    }

    // respond with json
    if (req.accepts('json')) {
      // if there is no token
      // return an error
      return res.status(403).send({ 
          success: false, 
          message: 'No token provided' 
      });
    }
  }
};

exports.isAllowed = function(resource, permission){
  return function(req, res, next) {
    acl.init(function(err){
      if (err) { res.json({ error: err });  }
      logger.debug(resource+' '+permission);
      logger.debug(req.user);
      acl.aclManager.isAllowed(User.getIdFromBLOB(req.user._id), resource, permission, function(err, result){
        logger.debug(result);
        if (err) res.json({ error: err }); 
        if (result) next();
        else{
          logger.debug(resources.ERRORS.PermissionDenied );
          res.json({ error: resources.ERRORS.PermissionDenied });
        }
      });
    });
  }
};
