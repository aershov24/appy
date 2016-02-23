var Repository = require('./repository')
  , logger = require('../helpers/logger.js')
  , crypto = require('crypto')
  , RESOURCES = require('../models/resources.js')
  , inherits   = require('util').inherits

function UserRepository() {
  UserRepository.super_.apply(this, ['users']);
}

inherits(UserRepository, Repository);

UserRepository.prototype.GetUserById = function(id, cb) {
  this.getById(id, function(err, user) {
    if (err) 
      return cb(err, null);
    return cb(null, user);
  });
};

UserRepository.prototype.GetUserByUsername = function(username, cb) {
  logger.debug('GetUserByUsername: ', username);
  this.findByValue('username', username, function(err, user) {
    if (err) 
      return cb(err, null);
    return cb(null, user);
  });
};

UserRepository.prototype.FindByEmail = function(email, cb) {
  this.findByValue('email', email, function(err, user) {
    if (err) 
      return cb(err, null);
    return cb(null, user);
  });
};

UserRepository.prototype.FindByFacebookId = function(facebookId, cb) {
  this.findByValue('facebook.id', facebookId, function(err, user) {
    if (err) 
      return cb(err, null);
    return cb(null, user);
  });
};

UserRepository.prototype.FindByLinkedinId = function(linkedinId, cb) {
  this.findByValue('linkedin.id', linkedinId, function(err, user) {
    if (err) 
      return cb(err, null);
    return cb(null, user);
  });
};

UserRepository.prototype.AddUser = function(newUser, cb){
  var self = this;
  self.findByValue('username', newUser.username, function(err, user) {
    if (err) return cb(err, null);
    if (user) return cb(RESOURCES.ERRORS.UserNameExists, null);
    self.findByValue('email', newUser.email, function(e, user) {
      if (err) return cb(err, null);
      if (user) return cb(RESOURCES.ERRORS.UserEmailExists, null);
      saltAndHash(newUser.password, function(hash){
        newUser.password = hash;
        self.create(newUser, function(err, user){
          if (err) return cb(err, null);
          return cb(null, user);
        });
      });
    });
  });
};

UserRepository.prototype.ValidatePassword = function(plainPass, hashedPass, callback)
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


module.exports = UserRepository;