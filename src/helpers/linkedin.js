var logger = require('../helpers/logger.js')
  , cfg   =   require('../config.js')
  , request = require('request');


function postOnWall(user, message,  cb) {
    logger.debug(user.linkedin.accessToken);
    var url = 'https://api.linkedin.com/v1/people/~/shares?oauth2_access_token='+user.linkedin.accessToken;
    var body = JSON.stringify({
        comment: 'Right move!',
        content: { 
          title: 'LinkedIn Moved From Rails To Node', 
          description: 'LinkedIn Moved From Rails To Node: 27 Servers Cut And Up To 20x Faster',
          "submitted-url": 'http://highscalability.com/blog/2012/10/4/linkedin-moved-from-rails-to-node-27-servers-cut-and-up-to-2.html',
          "submitted-image-url": "http://farm9.staticflickr.com/8317/8047052471_8388200c67_m.jpg"
          },
        visibility: { code: "anyone"}
    });

    var headers = {"Content-Type":"application/json", "x-li-format": "json"};

    request.post({url: url,  headers: headers, body: body }, function(err, resp, body) {
      if (err) return cb(err, null);
      logger.debug(body);
      //body = JSON.parse(body);
      cb(null, body);
    });
};

exports.postOnWall = postOnWall;
