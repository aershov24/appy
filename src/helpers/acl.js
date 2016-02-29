var acl = require('acl')
  , logger = require('../helpers/logger.js')
  , cfg = require('../config.js')
  , MongoClient = require('mongodb').MongoClient
  , ObjectID = require('mongodb').ObjectID;

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
   MongoClient.connect(cfg.MongoDB.connectionString, function(err, db) {
    module.exports.ROLES = ROLES;
    module.exports.RESOURCES = RESOURCES;
    module.exports.PERMISSIONS = PERMISSIONS;
    var aclManager = new acl(new acl.mongodbBackend(db, 'acl_'));
    
    aclManager.allow(ROLES.Admin, RESOURCES.User, PERMISSIONS.All);
    aclManager.allow(ROLES.User, RESOURCES.User, [PERMISSIONS.View]);
    aclManager.addUserRoles('56d3f3561f9bc26816190bc1', ROLES.Admin);

    module.exports.aclManager = aclManager;

    cb(err);
  });
};


