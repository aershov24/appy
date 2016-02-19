var ENV = process.env.NODE_ENV || 'DEV';
var Log = null;
var MongoDB = null;
var MongoDBLog = null;
var loggly = null;
var JSONToken = null;

var fbcall = null;
var linkedincall = null;
var rootPath = __dirname;

// production environment
if (ENV == 'PROD')
{
  MongoDB = {
    connectionString: "mongodb://appy:appy99@ds011288.mongolab.com:11288/appy"
  };

  MongoDBLog = {
    connectionString: "mongodb://appy:appy99@ds011308.mongolab.com:11308/appy_log"
  };

  Log = {
    file: "./logs/all-logs.log",
  };

  loggly = {
    token: "3a7c8ea5-1b6a-4759-8b9f-cbe2a8423a86",
    subdomain: "appy",
    tags: ["Appy"],
    json:true
  };

  JSONToken = {
    secret: 'secret',
    expires: 10*60*6
  };

  fbcall = 'https://appyws.herokuapp.com/auth/facebook/callback';
  linkedincall = 'https://appyws.herokuapp.com/auth/linkedin/callback';
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

  Log = {
    file: "./logs/all-logs.log",
  };

  loggly = {
    token: "3a7c8ea5-1b6a-4759-8b9f-cbe2a8423a86",
    subdomain: "appy",
    tags: ["Appy"],
    json:true
  };

  JSONToken = {
    secret : 'secret',
    expires: 10*60*6
  };

  fbcall = 'http://localhost:3000/auth/facebook/callback';
  linkedincall = 'http://localhost:3000/auth/linkedin/callback';
}

var facebook = {
    apiKey: '1526838307617018',
    apiSecret: '6e7115c22cb22d89d7b208ba1b5045a6',
    callback: fbcall,
    fields: ["id", "birthday", "email", "first_name", "gender", "last_name"]
}

var linkedin = {
    apiKey: '755qgme9oyarzu',
    apiSecret: '4NH0WMakwmfngFAd',
    callback: linkedincall,
    profileFields: ['r_emailaddress', 'r_basicprofile']
}

var mailgun = {
  apiKey: 'key-20700b4cadc80c0ad3116f0f794ff620', 
  domain: 'sandboxad4d16cd62bd4df9a26e2b4ee96feacc.mailgun.org'
}

var mail = {
  from: 'info@appy.com'
}

exports.ENV = ENV;
exports.Log = Log;
exports.MongoDB = MongoDB;
exports.MongoDBLog = MongoDBLog;
exports.facebook = facebook;
exports.linkedin = linkedin;
exports.loggly = loggly;
exports.JSONToken = JSONToken;
exports.mailgun = mailgun;
exports.mail = mail;
exports.rootPath = rootPath;