var request = require('request')
  , logger = require('../helpers/logger.js')
  , MongoClient = require('mongodb').MongoClient
  , ObjectID = require('mongodb').ObjectID
  , moment = require('moment')
  , deep = require('deep-diff')
  , diff = require('deep-diff').diff
  , cfg = require('../config.js');

getIdFromBLOB = function (id) {
  var objectId = new ObjectID(id.id);
  return objectId.toHexString();
};

exports.getDiff = function (historyId1, historyId2, cb) {
  logger.debug('historyId1: ', historyId1);
  logger.debug('historyId2: ', historyId2);
  MongoClient.connect(cfg.MongoDBHistory.connectionString, function(err, db) {
    history = db.collection('history');
    history.findOne({ '_id': new ObjectID(historyId1) }, function(err, row1) {
      if (err) 
      {
        logger.error(err);
        return;
      }
      logger.debug('Row 1: ', row1);
      history.findOne({ '_id': new ObjectID(historyId2) }, function(err, row2) {
        if (err) {
          logger.error(err);
          return;
        }
        logger.debug('Row 2', row2);
        var acc = [];
        diff(row1, row2, false, acc);
        logger.debug(JSON.stringify(acc));
        return cb(acc);
      });
    });
  });
};


exports.addHistory = function (object, collection, operation, id, meta) {
  MongoClient.connect(cfg.MongoDBHistory.connectionString, function(err, db) {
    history = db.collection('history');
    var historyRecord = {
      date: moment().format(),
      object: object,
      collection: collection,
      operation: operation,
      id: id,
      meta: meta
    };

    return history.insert(historyRecord, { safe: true }, function(err, result){
      if (err) { logger.error(err); return cb(err); }
      logger.debug('Add operaton to history: ', result);
    });
  });
};
