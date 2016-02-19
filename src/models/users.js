var logger = require('../helpers/logger.js')
  , RESOURCES = require('../models/resources.js')
  , MongoClient = require('mongodb').MongoClient
  , cfg = require('../config.js')
  , jwt     = require('jsonwebtoken')
  , assert = require('assert')
  , moment = require('moment')
  , crypto = require('crypto');

exports.GetUserByToken = function(token, cb) {
    // invalid token 
  jwt.verify(token, cfg.JSONToken.secret, function(err, decoded) {
    if (err) cb(err, null);
    if (!decoded) cb('Wrong token', null);
    logger.debug("Decoded: ", decoded);
    MongoClient.connect(cfg.MongoDB.connectionString, function(err, db) {
      assert.equal(null, err);
      // TODO: check collection for existing
      var users = db.collection('users');
      users.findOne({ _id: decoded}, function(err, user) {
        if (err) 
          cb(err, null);
        cb(null, user);
      });
    });
  });
};

exports.GetUserByUsername = function(username, cb) {
  MongoClient.connect(cfg.MongoDB.connectionString, function(err, db) {
    assert.equal(null, err);
    // TODO: check collection for existing
    var users = db.collection('users');
    users.findOne({ username: username}, function(err, user) {
      if (err) 
        cb(err, null);
      cb(null, user);
    });
  });
};

exports.FindByEmail = function(email, cb) {
  MongoClient.connect(cfg.MongoDB.connectionString, function(err, db) {
    assert.equal(null, err);
    // TODO: check collection for existing
    var users = db.collection('users');
    users.findOne({ email: email}, function(err, user) {
      if (err) 
        cb(err, null);
      cb(null, user);
    });
  });
};

exports.FindByFacebookId = function(facebookId, cb) {
  MongoClient.connect(cfg.MongoDB.connectionString, function(err, db) {
    assert.equal(null, err);
    logger.debug("Search by facebookId: %s", facebookId);
    var users = db.collection('users');
    users.findOne({ "facebook.id": facebookId}, function(err, user) {
      if (err) {
        logger.error(err);
        cb(err, null);
      }
      cb(null, user);
    });
  });
};

exports.FindByLinkedinId = function(linkedinId, cb) {
  MongoClient.connect(cfg.MongoDB.connectionString, function(err, db) {
    assert.equal(null, err);
    logger.debug("Search by LinkedinId: %s", linkedinId);
    var users = db.collection('users');
    users.findOne({ "linkedin.id": linkedinId}, function(err, user) {
      if (err) {
        logger.error(err);
        cb(err, null);
      }
      cb(null, user);
    });
  });
};

exports.AddUser = function(newUser, cb){
    MongoClient.connect(cfg.MongoDB.connectionString, function(err, db) {
    assert.equal(null, err);
    // TODO: check collection for existing
    var users = db.collection('users');

    users.findOne({ username: newUser.username}, function(err, user) {
      if (err) 
        cb(err, null);
      if (user){
        cb(RESOURCES.ERRORS.UserNameExists, null);
      } 
      else{
        users.findOne({ email: newUser.email }, function(e, user) {
          if (err) 
            cb(err, null);
          if (user){
            // user with the email exists - linking accounts
            cb(RESOURCES.ERRORS.UserEmailExists, null);
          } else{
            saltAndHash(newUser.password, function(hash){
              newUser.password = hash;
              // append date stamp when record was created //
              newUser.dateCreate = moment().format();
              users.insert(newUser, { safe: true }, function(err, result){
                if (err) cb(err, null);
                cb(null, result.ops[0]);
              });
            });
          }
        });
      }
    });
  });
};

exports.ValidatePassword = function(plainPass, hashedPass, callback)
{
  var salt = hashedPass.substr(0, 10);
  var validHash = salt + md5(plainPass + salt);
  callback(null, hashedPass === validHash);
};

/* private encryption & validation methods */
var generateSalt = function()
{
  var set = '0123456789abcdefghijklmnopqurstuvwxyzABCDEFGHIJKLMNOPQURSTUVWXYZ';
  var salt = '';
  for (var i = 0; i < 10; i++) {
    var p = Math.floor(Math.random() * set.length);
    salt += set[p];
  }
  return salt;
}

var md5 = function(str) {
  return crypto.createHash('md5').update(str).digest('hex');
}

var saltAndHash = function(pass, callback)
{
  var salt = generateSalt();
  callback(salt + md5(pass + salt));
}

/* auxiliary methods */

var getObjectId = function(id)
{
  return new require('mongodb').ObjectID(id);
};

var findById = function(id, callback)
{
  accounts.findOne({_id: getObjectId(id)},
    function(e, res) {
    if (e) callback(e)
    else callback(null, res)
  });
};


var findByMultipleFields = function(a, callback)
{
// this takes an array of name/val pairs to search against {fieldName : 'value'} //
  accounts.find( { $or : a } ).toArray(
    function(e, results) {
    if (e) callback(e)
    else callback(null, results)
  });
};
