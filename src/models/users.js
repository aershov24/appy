var Generic = require('./generic')
  , logger = require('../helpers/logger.js')
  , crypto = require('crypto')
  , RESOURCES = require('../models/resources.js')
  , inherits   = require('util').inherits

function User() {
  User.super_.apply(this, ['users']);
}

inherits(User, Generic);

User.prototype.GetUserById = function(id, cb) {
  this.getById(id, function(err, user) {
    if (err) 
      return cb(err, null);
    return cb(null, user);
  });
};

User.prototype.GetUserByUsername = function(username, cb) {
  logger.debug('GetUserByUsername: ', username);
  this.findByValue('username', username, function(err, user) {
    if (err) 
      return cb(err, null);
    return cb(null, user);
  });
};

User.prototype.FindByEmail = function(email, cb) {
  this.findByValue('email', email, function(err, user) {
    if (err) 
      return cb(err, null);
    return cb(null, user);
  });
};

User.prototype.FindByFacebookId = function(facebookId, cb) {
  this.findByValue('facebook.id', facebookId, function(err, user) {
    if (err) 
      return cb(err, null);
    return cb(null, user);
  });
};

User.prototype.FindByLinkedinId = function(linkedinId, cb) {
  this.findByValue('linkedin.id', linkedinId, function(err, user) {
    if (err) 
      return cb(err, null);
    return cb(null, user);
  });
};

User.prototype.FindByFoursquareId = function(foursquareId, cb) {
  this.findByValue('foursquare.id', foursquareId, function(err, user) {
    if (err) 
      return cb(err, null);
    return cb(null, user);
  });
};

User.prototype.AddUser = function(newUser, cb){
  var self = this;
  self.findByValue('email', newUser.email, function(err, user) {
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
};

User.prototype.ValidatePassword = function(plainPass, hashedPass, callback)
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

module.exports = User;