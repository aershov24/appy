var logger = require('../helpers/logger.js')
  , cfg   =   require('../config.js')
  , path = require('path')
  , fs = require('fs')
  , request = require('request')
  , Twitter = require('twit');

function postVideoOnWall(user, message, cb) {
  var client = new Twitter({
    consumer_key: cfg.twitter.apiKey,
    consumer_secret: cfg.twitter.apiSecret,
    access_token: user.twitter.accessTokenKey,
    access_token_secret: user.twitter.accessTokenSecret
  });

  // Load your image
  var videoPath = path.join(cfg.filesPath,'station.mp4');

  // Make post request on media endpoint. Pass file data as media parameter
  client.postMediaChunked({ file_path: videoPath },
    function(err, data, response){
    if (err) return cb(err, null);
    // If successful, a media object will be returned.
    logger.debug(data);
    // Lets tweet it
    var params = {
      status: 'I am a new video',
      media_ids: data.media_id_string // Pass the media id string
    }
    client.post('statuses/update', params, function(err, tweet, response){
      logger.debug(tweet);
      if (err) return cb(err, null);
      return cb(null, tweet);
    });
  });
};


//Function to Post Tweets in Twitter
function postOnWall(user, message, cb) {
  var client = new Twitter({
    consumer_key: cfg.twitter.apiKey,
    consumer_secret: cfg.twitter.apiSecret,
    access_token: user.twitter.accessTokenKey,
    access_token_secret: user.twitter.accessTokenSecret
  });

  // Load your image
  var data = require('fs').readFileSync(path.join(cfg.filesPath,'google.png'), { encoding: 'base64' });
  logger.debug("Get data");
  // Make post request on media endpoint. Pass file data as media parameter
  client.post('media/upload', { media_data: data }, function(err, data, response){
    if (err) return cb(err, null);
    // If successful, a media object will be returned.
    logger.debug(data);
    // Lets tweet it
    var params = {
      status: 'I am a video, https://twittercommunity.com/t/twitter-video-support-in-rest-and-streaming-api/31258',
      media_ids: data.media_id_string // Pass the media id string
    }
    client.post('statuses/update', params, function(err, tweet, response){
      logger.debug(tweet);
      if (err) return cb(err, null);
      return cb(null, tweet);
    });
  });
};

exports.postOnWall = postOnWall;
exports.postVideoOnWall = postVideoOnWall;
 