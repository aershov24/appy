var mongodb = require('mongodb')
  , MongoClient = require('mongodb').MongoClient
  , ObjectID = require('mongodb').ObjectID
  , cfg = require('../config.js');

module.exports.init = function (cb) {
  MongoClient.connect(cfg.MongoDB.connectionString, function(err, db) {
    module.exports.db = db;
    module.exports.users = db.collection('users');
    cb(err);
  });
};

module.exports.getIdFromBLOB = function (id) {
  var objectId = new ObjectID(id.id);
  return objectId.toHexString();
};