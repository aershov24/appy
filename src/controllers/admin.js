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
  customMw.isAllowed('User', '*'), // Read, Write, Select, * 
  function(req, res) {
    logger.debug('Managing users...');
    return res.json({message: 'managing users...'});
});

/**
 * @api {get} /admin/manageMessages Check permissions for messages
 * @apiName ManageMessages
 * @apiGroup Admin
 */
router.get('/manageMessages', 
  customMw.isAuthentificated, 
  customMw.isAllowed('Messages', 'View'), 
  function(req, res) {
    logger.debug('Managing messages...');
    return res.json({message: 'managing messages...'});
});

/**
 * @api {get} /admin/allow Add permissions to resource
 * @apiName AllowPermissions
 * @apiGroup Admin
 */
router.post('/allowPermission', 
  customMw.isAuthentificated, 
  customMw.isAllowed('User', '*'), 
  function(req, res) {
    acl.aclManager.allow(
      req.body.roles, 
      req.body.resources, 
      req.body.permissions, 
      function(err){
        if (err) { return res.json({ error: err }); }
        return res.json({message: 'Permissions added'});
    });
});

/**
 * @api {get} /admin/whatResources What resources allowed for the role
 * @apiName RemovePermissions
 * @apiGroup Admin
 */
router.get('/whatResources/:role', 
  customMw.isAuthentificated, 
  customMw.isAllowed('User', '*'), 
  function(req, res) {
    acl.aclManager.whatResources(
      req.params.role,  
      function(err, permissions){
        if (err) { return res.json({ error: err }); }
        return res.json({message: permissions});
    });
});

/**
 * @api {get} /admin/removeAllow Remove permissions to resource
 * @apiName RemovePermissions
 * @apiGroup Admin
 */
router.post('/removePermission', 
  customMw.isAuthentificated, 
  customMw.isAllowed('User', '*'), 
  function(req, res) {
    acl.aclManager.removeAllow(
      req.body.roles, 
      req.body.resources, 
      req.body.permissions, 
      function(err){
        if (err) { return res.json({ error: err }); }
        return res.json({message: 'Permissions removed'});
    });
});


/**
 * @api {get} /admin/removeResource Remove resource from the system
 * @apiName RemoveResource
 * @apiGroup Admin
 */
router.get('/removeResource/:resource', 
  customMw.isAuthentificated, 
  customMw.isAllowed('User', '*'), 
  function(req, res) {
    acl.aclManager.removeResource(
      req.params.resource, 
      function(err){
      if (err) { return res.json({ error: err }); }
      return res.json({message: 'Resource deleted'});
    });
});

/**
 * @api {get} /admin/removeRole Remove role from the system
 * @apiName RemoveRole
 * @apiGroup Admin
 */
router.get('/removeRole/:role', 
  customMw.isAuthentificated, 
  customMw.isAllowed('User', '*'), 
  function(req, res) {
    acl.aclManager.removeRole(
      req.params.role, 
      function(err){
      if (err) { return res.json({ error: err }); }
      return res.json({message: 'Role deleted'});
    });
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

/**
 * @api {get} /admin/getUserRoles Get user roles
 * @apiName GetUserInfo
 * @apiGroup User
 */
router.get('/getUserRoles', 
  customMw.isAuthentificated,
  customMw.isAllowed('User', '*'),
  function(req, res) {
  acl.aclManager.userRoles(User.getIdFromBLOB(req.user._id), function(err, roles){
      if (err) { return res.json({ error: err }); }
      return   res.json({ roles : roles });
    });
});

module.exports = router;
