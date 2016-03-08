var logger = require('../helpers/logger.js')
  , cfg   =   require('../config.js')
  , path = require('path')
  , Twitter = require('twitter');

//Function to Post Tweets in Twitter
function postOnWall(user, message, cb) {
  var client = new Twitter({
    consumer_key: cfg.twitter.apiKey,
    consumer_secret: cfg.twitter.apiSecret,
    access_token_key: user.twitter.accessTokenKey,
    access_token_secret: user.twitter.accessTokenSecret
  });

  // Load your image
  var data = require('fs').readFileSync(path.join(cfg.filesPath,'google.png'));

  // Make post request on media endpoint. Pass file data as media parameter
  client.post('media/upload', {media: data}, function(error, media, response){
    if (!error) {
      // If successful, a media object will be returned.
      logger.debug(media);
      // Lets tweet it
      var status = {
        status: 'I am a tweet, www.recomen-do.com',
        media_ids: media.media_id_string // Pass the media id string
      }

      client.post('statuses/update', status, function(err, tweet, response){
        if (err) return cb(err, null);
        return cb(null, err);
      });
    }
  });
};

exports.postOnWall = postOnWall;
 