var logger = require('../helpers/logger.js')
  , cfg   =   require('../config.js')
  , request = require('request');

// http://code.runnable.com/UTlPM1-f2W1TAABY/post-on-facebook
function postMessage(access_token, message, cb) {
    // Specify the URL and query string parameters needed for the request
    var url = 'https://graph.facebook.com/me/feed';
    var params = {
        access_token: access_token,
        message: 'Google message',
        link: 'www.google.com',
        picture: 'http://cdni.wired.co.uk/1920x1280/g_j/GOOGLELOGO_1.jpg',
        name: 'Google',
        caption: 'Google',
        description: 'Google description',
        privacy: {
          value: 'SELF'
        }
    };

    request.post({url: url, qs: params}, function(err, resp, body) {
      if (err) return cb(err, null);
      body = JSON.parse(body);
      cb(null, body);
    });
}

// http://code.runnable.com/UTlPM1-f2W1TAABY/post-on-facebook
function sendNotification(access_token, userId, message, cb) {
    logger.debug('Send notification');
    // Specify the URL and query string parameters needed for the request
    var url = 'https://graph.facebook.com/'+userId+'/notifications';
    var params = {
        href: 'users/login',
        access_token: cfg.facebook.appAccessToken,//access_token,
        template: message
    };

    request.post({url: url, qs: params}, function(err, resp, body) {
      if (err) return cb(err, null);
      body = JSON.parse(body);
      cb(null, body);
    });
}

exports.postMessage = postMessage;
exports.sendNotification = sendNotification;