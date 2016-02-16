var express = require('express')
  , User    = require('../models/users.js')
  , router = express.Router()
  , logger = require('../helpers/logger.js')
  , customMw = require('../middlewares/middleware.js')
  , cfg     = require('../config.js')
  , jwt     = require('jsonwebtoken');


var operations = { 
    getData: function(req, res, params){ 
        res.send({ operation: 'getData', params: params }); 
    },
    getData1: function(req, res, params){ 
        res.send({ operation: 'getData1', params: params }); 
    }
};

router.get('/:operation/:params', customMw.isAuthentificated, function(req, res) {
  logger.debug('Requested operation: '+req.params.operation+'('+req.params.params+')');
  if (operations[req.params.operation])
    operations[req.params.operation](req, res, req.params.params);
  else
  {
    logger.debug('Operation undefined: '+req.params.operation+'('+req.params.params+')');
    res.send({ operation: req.params.operation, params: req.params.params, error: 'Operation undefined' }); 
  }
});

router.post('/authentification', function(req, res) {
  // find the user
  User.getUser(req.body.name, function(err, user) {
    if (err) throw err;
    if (!user) {
      res.json({ success: false, message: 'Authentication failed. User not found.' });
    } else if (user) {

      // check if password matches
      if (user.password != req.body.password) {
        res.json({ success: false, message: 'Authentication failed. Wrong password.' });
      } else {
        // if user is found and password is right
        // create a token
        var token = jwt.sign(user, cfg.secret, {
          expiresIn: 10*60 // expires in 10 minutes
        });

        // return the information including token as JSON
        res.json({
          success: true,
          message: 'User authentificated',
          token: token
        });
      }   
    }
  });
});

module.exports = router;

/**
 * @api {post} /api/authentification User authentification
 * @apiName Authentification
 * @apiGroup Authentification
 *
 * @apiParam {Object} details Login details
 * @apiParamExample {json} Request-Example:
 *     {
 *       "name"      : "aershov24@gmail.com",
 *       "password"  : "demo"
 *     }
 * @apiSuccess {Object} object User token object or error message
 * @apiSuccessExample {json} Sucess-Response:
 *  {
 *    "success": true,
 *    "message": "User authentificated",
 *    "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6ImFlcnNob3YyNEBnbWFpbC5jb20iLCJwYXNzd29yZCI6IjEyMyIsImNsaWVudCI6Im5vZGUuYmEiLCJpYXQiOjE0NTQzODUwMjcsImV4cCI6MTQ1NDM4NTYyN30.AJI4SlG1UstNGTe_Taa3-PlovgHbIvXOPuD8B_ijPGk"
 *  }
 * @apiError {Object} 403  Failed authentification info
 * @apiErrorExample {json} Error-Response:
 *  {
 *    "success": false,
 *    "message": "Authentication failed. Wrong password."
 *  }  
 */

