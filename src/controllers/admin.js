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
  , acl = require('../helpers/acl.js')
  , resources = require('../models/resources')
  , router = exp.Router();

/**
 * @api {get} /admin/manageUsers Check permissions for user manage
 * @apiName ManageUsers
 * @apiGroup Admin
 */
router.get('/manageUsers', 
  customMw.isAuthentificated, 
  customMw.isAllowed('User', '*'), 
  function(req, res) {
    logger.debug('Managing users...');
    return res.json({message: 'managing users...'});
});

/**
 * @api {get} /admin/addUserRoles Add a user to a role
 * @apiName AddUserRoles
 * @apiGroup Admin
 */
router.get('/addUserRoles/:userId/:role', 
  customMw.isAuthentificated, 
  customMw.isAllowed('User', '*'),
  function(req, res) {
    acl.aclManager.addUserRoles(req.params.userId, req.params.role, function(err){
      if (err) { return res.json({ error: err }); }
      return res.json({message: 'User added to role'});
    });
});

/**
 * @api {get} /admin/deleteUserRoles Delete user from a role
 * @apiName DeleteUserRoles
 * @apiGroup Admin
 */
router.get('/deleteUserRoles/:userId/:role',
  customMw.isAuthentificated, 
  customMw.isAllowed('User', '*'), 
  function(req, res) {
    acl.aclManager.removeUserRoles(req.params.userId, req.params.role, function(err){
      if (err) { return res.json({ error: err }); }
      return res.json({message: 'User removed from role'});
    });
});

module.exports = router;
