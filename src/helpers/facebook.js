var request = require('request');

// http://code.runnable.com/UTlPM1-f2W1TAABY/post-on-facebook
function postMessage(access_token, message, cb) {
    // Specify the URL and query string parameters needed for the request
    var url = 'https://graph.facebook.com/me/feed';
    var params = {
        access_token: access_token,
        message: message
    };

    request.post({url: url, qs: params}, function(err, resp, body) {
      if (err) return cb(err, null);
      body = JSON.parse(body);
      cb(null, body);
    });
}

exports.postMessage = postMessage;