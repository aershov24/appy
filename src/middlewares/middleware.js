var logger  = require('../helpers/logger.js')
  , path    = require('path')
  , cfg     = require('../config.js')
  , jwt     = require('jsonwebtoken');
  
exports.isAuthentificated = function(req, res, next){
    // check header or url parameters or post parameters for token
  var token = req.body.token || req.query.token || req.headers['x-access-token'];
  if (token) {
    // verifies secret and checks exp
    jwt.verify(token, cfg.JSONToken.secret, function(err, decoded) {      
      if (err) {
        return res.json({ success: false, message: 'Failed to authenticate token' });    
      } else {
        logger.debug('Auth ok, next');
        // if everything is good, save to request for use in other routes
        req.decoded = decoded;
        next();
      }
    });
    } else {
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