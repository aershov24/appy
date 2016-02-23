var mongodb = require('mongodb')
  , logger = require('../helpers/logger.js')
  , MongoClient = require('mongodb').MongoClient
  , ObjectID = require('mongodb').ObjectID  
  , history = require('../helpers/history.js')
  , cfg = require('../config.js');

var Repository = exports.Repository = function (collection) {
  this.collection = collection;
  this.connectionString = cfg.MongoDB.connectionString;
};

Repository.prototype.getIdFromBLOB = function (id) {
  var objectId = new ObjectID(id.id);
  return objectId.toHexString();
};

Repository.prototype.create = function(object, cb) {
  object.created = new Date();
  var collectionName = this.collection;
  MongoClient.connect(this.connectionString, function(err, db) {
    db.collection(collectionName, function(err, col){
      if (err){ 
        return cb(err, null);
      }
      col.insert(object, { safe: true }, function(err, result){
        if (err) return cb(err, null);
        history.addHistory(JSON.parse(JSON.stringify(result.ops[0])), 
          collectionName, 
          'created', 
          getIdFromBLOB(result.ops[0]._id), 
          { action: 'created '+collectionName});
        return cb(null, result.ops[0]);
      });
    });
  });
};

Repository.prototype.update = function(object, cb) {
  object.modified = new Date();
  var collectionName = this.collection;
  MongoClient.connect(this.connectionString, function(err, db) {
    db.collection(collectionName, function(err, col){
      if (err){ 
        return cb(err, null);
      }
      col.update({ _id: object._id}, object, function(err, result) {
        if (err) return cb(err, null);
        history.addHistory(object, collectionName, 'updated', getIdFromBLOB(object._id), {action: 'updated '+collectionName});
        return cb(null, result);
      });
    });
  });
};

Repository.prototype.delete = function(object, cb) {
  var collectionName = this.collection;
  MongoClient.connect(this.connectionString, function(err, db) {
    db.collection(collectionName, function(err, col){
      if (err){ 
        return cb(err, null);
      }
      col.remove({ _id: object._id}, function(err, result) {
        if (err) return cb(err, null);
        history.addHistory(object, collectionName, 'deleted', getIdFromBLOB(objectId), {action: 'deleted '+collectionName});
        return cb(null, result);
      });
    });
  });
};

Repository.prototype.getById = function(objectId, cb) {
  var collectionName = this.collection;
  MongoClient.connect(this.connectionString, function(err, db) {
    db.collection(collectionName, function(err, col){
      if (err) return cb(err, null);
      col.findOne({ _id: objectId}, function(err, object) {
        if (err) return cb(err, null);
        return cb(null, object);
      });
    });
  });
};

Repository.prototype.findByValue = function(field, value, cb) {
  logger.debug('FinByValue: ', field, value );
  var collectionName = this.collection;
  MongoClient.connect(this.connectionString, function(err, db) {
    db.collection(collectionName, function(err, col){
      if (err) return cb(err, null);
      var query = {};
      query[field] = value;
      col.findOne(query, function(err, object) {
        if (err) return cb(err, null);
        return cb(null, object);
      });
    });
  });
};

module.exports = Repository;

