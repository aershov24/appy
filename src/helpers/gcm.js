var gcm = require('node-gcm')
  , logger = require('../helpers/logger.js')
  , cfg = require('../config.js');

var sender = new gcm.Sender(cfg.googlegcm.serverAPIKey);

exports.sendNotification = function(cb){
  var message = new gcm.Message();
  message.addNotification('title', 'Alert!!!');
  message.addNotification('body', 'Abnormal data access');
  message.addNotification('icon', 'icon');
  message.addNotification('sound', 'default');

  // get the registerId from GCM demo app
  // go to InstanceID and Auth. Tokens
  // Click Get token
  // Choose or add sender id: 960605552586
  // click on eye to show logs and copy token
  // put token ib the array bellow
  var registrationTokens = ['eYri0Q-9gFw:APA91bHqWJIbTvkQ6GJNb_GfQe-yNPwhmVM1xdGl0ZRPd50TDNo4dGf1KXCXkAq69vzMsK1kKyD96RDNhW6xTjlzl5WyBn6VIhK4UBXqw1R3HuNZ3cx5Kh7bDoeLm1TfTqJ4i1Fw5guO'];

  sender.send(message, { registrationTokens: registrationTokens }, 
    function (err, res) {
    if (err) cb(err, null);
    else cb(null, res);
  });
};

exports.sendTopicNotification = function(cb){
  var message = new gcm.Message();
  message.addNotification({
    title: 'Topic',
    body: 'Abnormal data access',
    icon: 'icon',
    sound: 'default'
  });

  // get the registerId from GCM demo app
  // go to InstanceID and Auth. Tokens
  // Click Get token
  // Choose or add sender id: 960605552586
  // click on eye to show logs and copy token
  // put token ib the array bellow
  //var registrationTokens = ['eYri0Q-9gFw:APA91bHqWJIbTvkQ6GJNb_GfQe-yNPwhmVM1xdGl0ZRPd50TDNo4dGf1KXCXkAq69vzMsK1kKyD96RDNhW6xTjlzl5WyBn6VIhK4UBXqw1R3HuNZ3cx5Kh7bDoeLm1TfTqJ4i1Fw5guO'];

  sender.send(message, { topic: '/topics/test' }, 
    function (err, res) {
    if (err) cb(err, null);
    else cb(null, res);
  });
};