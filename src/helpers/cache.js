var cacheManager = require('cache-manager')
  , redisStore = require('cache-manager-redis')
  , User = require('../models/users.js')
  , logger = require('../helpers/logger.js')
  , cfg   =   require('../config.js')
  , ObjectID = require('mongodb').ObjectID
  , cache = cacheManager.caching({
      store: redisStore,
      host: cfg.redis.host, // default value
      port: cfg.redis.port, // default value
      auth_pass: cfg.redis.password,
      db: 0,
      ttl: 10
  });

var ttl = 5;

// listen for redis connection error event
cache.store.events.on('redisError', function(error) {
  // handle error here
  logger.error(error);
});

cache.set('foo', 'bar', ttl, function(err) {
  if (err) {
    throw err;
  }
  cache.get('foo', function(err, result) {
    cache.del('foo', function(err) {});
  });
});
 /**
 * Wraps User.get() with memoryCache.wrap().
 * First call to this function will call User.get and
 * cache the result. Subsequent requests, until the cache TTL
 * has expired, will return the user from cache.
 */
fetchUser = function(id, cb) {
  var objectId = new ObjectID(id.id);
  logger.debug("Get user from cache: ", objectId.toHexString());
    var cacheKey = 'user_' + objectId.toHexString();
    cache.wrap(cacheKey, function (cacheCb) {
        logger.debug("Fetching user from db");
        User.GetUserById(id, cacheCb);
    }, cb);
};

exports.fetchUser = fetchUser;