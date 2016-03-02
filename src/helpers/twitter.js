var logger = require('../helpers/logger.js')
  , cfg   =   require('../config.js')
  , Twitter = require('twitter');

//Function to Post Tweets in Twitter
function postOnWall(user, message, cb) {
  var client = new Twitter({
    consumer_key: cfg.twitter.apiKey,
    consumer_secret: cfg.twitter.apiSecret,
    access_token_key: user.twitter.accessTokenKey,
    access_token_secret: user.twitter.accessTokenSecret
  });

  client.post('statuses/update', 
    { status: message },  
    function(err, tweet, response){
      if (err) return cb(err, null);
      return cb(null, tweet);
  });
};

exports.postOnWall = postOnWall;
 