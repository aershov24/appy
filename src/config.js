var fs = require('fs');
var ENV = process.env.NODE_ENV || 'DEV';

var log = {
    file: "./logs/all-logs.log",
};

exports.secret = 'ilovescotchyscotch';
exports.ENV = ENV;
exports.log = log;
