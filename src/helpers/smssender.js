var cfg  = require('../config.js')
  , logger = require('../helpers/logger.js')
  , smsclient = require('twilio')(cfg.twilio.accountSid, cfg.twilio.authToken);
 
sendSMSMessage = function(to, body, cb){
  smsclient.messages.create({
    from: cfg.twilio.from,
    body: body,
    to: to
  }, function(err, message) {
    if (err){ 
      logger.error(err);
      return cb(err, null);
    }
    return cb(null, message);
  });
};

exports.sendSMSMessage = sendSMSMessage;

