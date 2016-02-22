var request = require('request')
  //, Datadiff = require('datadiff')
  , logger = require('../helpers/logger.js')
  , MongoClient = require('mongodb').MongoClient
  , ObjectID = require('mongodb').ObjectID
  , db = require('../models/db.js')
  , moment = require('moment')
  , cfg = require('../config.js');
  //, ddiff = new Datadiff({key: cfg.datadiff.key, secret: cfg.datadiff.secret});

getIdFromBLOB = function (id) {
  var objectId = new ObjectID(id.id);
  return objectId.toHexString();
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
