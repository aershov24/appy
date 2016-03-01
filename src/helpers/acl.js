var acl = require('acl')
  , logger = require('../helpers/logger.js')
  , cfg = require('../config.js')
  , MongoClient = require('mongodb').MongoClient
  , ObjectID = require('mongodb').ObjectID;

module.exports.init = function (cb) {
  logger.debug('ACL Init...');
   MongoClient.connect(cfg.MongoDB.connectionString, function(err, db) {
    var aclManager = new acl(new acl.mongodbBackend(db, 'acl_'));
    aclManager.allow('Admin', 'User', '*');
    aclManager.addUserRoles('56d3f3561f9bc26816190bc1', 'Admin');
    module.exports.aclManager = aclManager;
    cb(err);
  });
};


