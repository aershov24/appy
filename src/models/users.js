var logger = require('../helpers/logger.js');

var users = [
  { username: 'aershov24@gmail.com', password: '123', client: 'node.ba'}
];

exports.getUser = function(username, cb) {
  logger.pdata("GetUser", username);
  for (var i in users) {
    if (users[i].username === username)
      logger.pdata("Founded user: ", users[i]);
      return cb(null, users[i]);
    }

  return cb({ error: 'Cant find user with username: '+ username }, null);
};
