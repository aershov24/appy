var logger = require('../helpers/logger.js')
  , RESOURCES = require('../models/resources.js')
  , cfg = require('../config.js')
  , db = require('./db.js')
  , moment = require('moment')
  , crypto = require('crypto');

exports.GetUserById = function(id, cb) {
  db.init(function(err){
    if (err) return cb(err, null);
    db.users.findOne({ _id: id}, function(err, user) {
      if (err) 
        return cb(err, null);
      return cb(null, user);
    });
  });
};

exports.GetUserByUsername = function(username, cb) {
  db.init(function(err){
    if (err) return cb(err, null);
    db.users.findOne({ username: username}, function(err, user) {
      if (err) 
        return cb(err, null);
      return cb(null, user);
    });
  });
};

exports.FindByEmail = function(email, cb) {
  db.init(function(err){
    if (err) return cb(err, null);
    db.users.findOne({ email: email}, function(err, user) {
      if (err) 
        return cb(err, null);
      return cb(null, user);
    });
  });
};

exports.FindByFacebookId = function(facebookId, cb) {
  db.init(function(err){
    if (err) return cb(err, null);
    db.users.findOne({ "facebook.id": facebookId}, function(err, user) {
      if (err) {
        logger.error(err);
        return cb(err, null);
      }
      return cb(null, user);
    });
  });
};

exports.FindByLinkedinId = function(linkedinId, cb) {
  db.init(function(err){
    if (err) return cb(err, null);
    db.users.findOne({ "linkedin.id": linkedinId}, function(err, user) {
      if (err) {
        logger.error(err);
        cb(err, null);
      }
      cb(null, user);
    });
  });
};

exports.AddUser = function(newUser, cb){
  db.init(function(err){
    if (err) return cb(err, null);
    db.users.findOne({ username: newUser.username}, function(err, user) {
      if (err) 
        cb(err, null);
      if (user){
        cb(RESOURCES.ERRORS.UserNameExists, null);
      } 
      else{
        db.users.findOne({ email: newUser.email }, function(e, user) {
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
              db.users.insert(newUser, { safe: true }, function(err, result){
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
