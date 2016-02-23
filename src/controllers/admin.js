var exp = require('express')
  , passport = require('passport')
  , customMw = require('../middlewares/middleware.js')
  , cfg   =   require('../config.js')
  , UserRepository  = require('../models/userRepository.js')
  , logger = require('../helpers/logger.js')
  , mailer = require('../helpers/mailer.js')
  , smssender = require('../helpers/smssender.js')
  , decoder = require('../helpers/decoder.js')
  , cache = require('../helpers/cache.js')
  , acl = require('../helpers/acl.js')
  , resources = require('../models/resources')
  , router = exp.Router();

var User = new UserRepository();

/**
 * @api {get} /admin/manageUsers Check permissions for user manage
 * @apiName ManageUsers
 * @apiGroup Admin
 */
router.get('/manageUsers', customMw.isAuthentificated, function(req, res) {
  var token = req.body.token || req.query.token || req.headers['x-access-token'];
  decoder.getObjectByToken(token, function(err, id){
    if (err) { return res.status(401).json({ error: err });  }
    cache.fetchUser(id, function(err, user) {
      if (err) { return res.status(401).json({ error: err });  }
      acl.init(function(err){
        if (err) { return res.status(401).json({ error: err });  }
        acl.aclManager.isAllowed(User.getIdFromBLOB(id), acl.RESOURCES.User, acl.PERMISSIONS.All, function(err, result){
          if (err) return res.status(401).json({ error: err }); 
          if (result) return res.json({message: result});
          else return res.status(401).json({ error: resources.ERRORS.PermissionDenied });
        });
      });
    });
  });
});

/**
 * @api {get} /admin/addUserRoles Add a user to a role
 * @apiName AddUserRoles
 * @apiGroup Admin
 */
router.get('/addUserRoles/:userId/:role', customMw.isAuthentificated, function(req, res) {
  var token = req.body.token || req.query.token || req.headers['x-access-token'];
  decoder.getObjectByToken(token, function(err, id){
    if (err) { return res.status(401).json({ error: err });  }
    cache.fetchUser(id, function(err, user) {
      if (err) { return res.status(401).json({ error: err });  }
      acl.init(function(err){
        if (err) { return res.status(401).json({ error: err });  }
        acl.aclManager.isAllowed(User.getIdFromBLOB(id), acl.RESOURCES.User, acl.PERMISSIONS.All, function(err, result){
          if (err) return res.status(401).json({ error: err }); 
          if (!result) return res.status(401).json({ error: resources.ERRORS.PermissionDenied });
          acl.aclManager.addUserRoles(req.params.userId, req.params.role, function(err){
            if (err) { return res.status(401).json({ error: err }); }
            return res.json({message: 'User added to role'});
          });
        });
      });
    });
  });
});

module.exports = router;
