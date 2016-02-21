var acl = require('acl')
  , logger = require('../helpers/logger.js')
  , cfg = require('../config.js')
  , db = require('../models/db.js');

var ROLES = {
  Admin: 'Admin',
  User: 'User'
};

var RESOURCES = {
  User: 'User'
};

var PERMISSIONS = {
  View: 'View',
  Create: 'Create',
  Delete: 'Delete',
  All: '*'
};

module.exports.init = function (cb) {
  logger.debug('ACL Init...');
  db.init(function(err) {
    module.exports.ROLES = ROLES;
    module.exports.RESOURCES = RESOURCES;
    module.exports.PERMISSIONS = PERMISSIONS;
    var aclManager = new acl(new acl.mongodbBackend(db.db, 'acl_'));
    
    aclManager.allow(ROLES.Admin, RESOURCES.User, PERMISSIONS.All);
    aclManager.allow(ROLES.User, RESOURCES.User, [PERMISSIONS.View]);
    aclManager.addUserRoles('56c729dce3532f701d461b84', ROLES.Admin);

    module.exports.aclManager = aclManager;

    cb(err);
  });
};


