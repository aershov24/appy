var path = require('path');

var ENV = process.env.NODE_ENV || 'DEV';
var Log = null;
var MongoDB = null;
var MongoDBLog = null;
var MongoDBHistory = null;
var loggly = null;
var JSONToken = null;
var redis = null;
var datadiff = null;

var fbcall = null;
var twittercall = null;
var linkedincall = null;
var foursquarecall = null;
var rootPath = __dirname;
var templatesPath = path.join(rootPath, 'templates'); 
var filesPath = path.join(rootPath, 'files'); 

// production environment
if (ENV == 'PROD')
{
  MongoDB = {
    connectionString: "mongodb://appy:appy99@ds011288.mongolab.com:11288/appy"
  };

  MongoDBLog = {
    connectionString: "mongodb://appy:appy99@ds011308.mongolab.com:11308/appy_log"
  };

  MongoDBHistory = {
    connectionString: "mongodb://appy:appy99@ds013898.mongolab.com:13898/appy_history"
  };

  Log = {
    file: "./logs/all-logs.log",
  };

  loggly = {
    token: "3a7c8ea5-1b6a-4759-8b9f-cbe2a8423a86",
    subdomain: "appy",
    tags: ["Appy"],
    json: true
  };

  JSONToken = {
    secret: 'secret',
    expires: 10*60*6
  };

  redis = {
    host: 'ec2-54-83-207-91.compute-1.amazonaws.com',
    port: '7089',
    password: 'pcnj8oj3um615b3j1mifv0a8rfa'
  };

  datadiff = {
    key: 'c4fyad2sxscerk9qmyp7wb9vzp5vcxr', 
    secret: 'tix3imk8s2vmfgvipjl43xg4rbb7qfr'
  };

  fbcall = 'https://appyws.herokuapp.com/auth/facebook/callback';
  twittercall = 'https://appyws.herokuapp.com/auth/twitter/callback';
  linkedincall = 'https://appyws.herokuapp.com/auth/linkedin/callback';
  foursquarecall = 'https://appyws.herokuapp.com/foursquare/callback';
}

// development environment
if (ENV == 'DEV')
{
  MongoDB = {
    connectionString: "mongodb://appy:appy99@ds011288.mongolab.com:11288/appy"
  };

  MongoDBLog = {
    connectionString: "mongodb://appy:appy99@ds011308.mongolab.com:11308/appy_log"
  };

  MongoDBHistory = {
    connectionString: "mongodb://appy:appy99@ds013898.mongolab.com:13898/appy_history"
  };

  Log = {
    file: "./logs/all-logs.log",
  };

  loggly = {
    token: "3a7c8ea5-1b6a-4759-8b9f-cbe2a8423a86",
    subdomain: "appy",
    tags: ["Appy"],
    json: true
  };

  JSONToken = {
    secret : 'secret',
    expires: 10*60*6
  };

  redis = {
    host: 'ec2-54-83-207-91.compute-1.amazonaws.com',
    port: '7089',
    password: 'pcnj8oj3um615b3j1mifv0a8rfa'
  };

  datadiff = {
    key: 'c4fyad2sxscerk9qmyp7wb9vzp5vcxr', 
    secret: 'tix3imk8s2vmfgvipjl43xg4rbb7qfr'
  };

  fbcall = 'http://localhost:3000/auth/facebook/callback';
  twittercall = 'http://127.0.0.1:3000/auth/twitter/callback';
  linkedincall = 'http://localhost:3000/auth/linkedin/callback';
  foursquarecall = 'http://localhost:3000/foursquare/callback';
}

var facebook = {
    apiKey: '1526838307617018',
    apiSecret: '6e7115c22cb22d89d7b208ba1b5045a6',
    callback: fbcall,
    // All the fields
    // https://developers.facebook.com/docs/graph-api/reference/v2.5/user
    fields: ["id", "birthday", "email", "first_name", "gender", "last_name", "friends", "languages"]
}

var linkedin = {
    apiKey: '755qgme9oyarzu',
    apiSecret: '4NH0WMakwmfngFAd',
    callback: linkedincall,
    profileFields: ['r_emailaddress', 'r_basicprofile']
}

var twitter = {
    apiKey: 'IuTxnLFvhul7eP7kVI0nmo4K0',
    apiSecret: 'eHh1TrfI1lza5qr8W4QQU6JIA7vBu7FtJgoEk1hcmFvffeOkiS',
    callback: twittercall
}

var foursquare = {
  'secrets' : {
    'clientId' : 'AIVNATEDJSU21PUF3YY523GPV3XCQM05OH3IWQRBY24NPMTC',
    'clientSecret' : 'Q2DQQHRKI2VVPG2NJTQEKNSENGBAT05YRCOT4N0KIW2LFDT5',
    'redirectUrl' : foursquarecall
  }
}

var locu = {
  apiKey : 'f5a0902036696fdbc49875dc4440d41114cfbd47',
  widgetKey : 'a1f89be959bc4f8c683d3a687f4d2640fe7af675'
}

var mailgun = {
  apiKey: 'key-20700b4cadc80c0ad3116f0f794ff620', 
  domain: 'sandboxad4d16cd62bd4df9a26e2b4ee96feacc.mailgun.org'
}

var twilio = {
  from: '+61481072223',
  accountSid: 'ACacb739d781ca5c996c0733789ebb6a83',
  authToken: 'd8472a21473b6fa49baf10860aa1fe43'
}

var mail = {
  from: 'info@appy.com'
}

exports.ENV = ENV;
exports.Log = Log;
exports.MongoDB = MongoDB;
exports.MongoDBLog = MongoDBLog;
exports.MongoDBHistory = MongoDBHistory;
exports.facebook = facebook;
exports.linkedin = linkedin;
exports.twitter = twitter;
exports.foursquare = foursquare;
exports.locu = locu;
exports.loggly = loggly;
exports.JSONToken = JSONToken;
exports.mailgun = mailgun;
exports.twilio = twilio;
exports.redis = redis;
exports.datadiff = datadiff;

exports.mail = mail;
exports.rootPath = rootPath;
exports.templatesPath = templatesPath;
exports.filesPath = filesPath;