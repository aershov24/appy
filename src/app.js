var logger  = require('./helpers/logger.js')
  , express = require('express')
  , app     = express()
  , bodyParser = require('body-parser')
  , cfg     = require('./config.js')
  , http    = require('http')
  , errorhandler = require('./middlewares/errorhandler.js')
  , customMw = require('./middlewares/middleware.js')
  , morgan = require('morgan')
  , createDomain = require('domain').create
  , passport  = require('passport')
  , LocalStrategy = require('passport-local').Strategy
  , LinkedInStrategy = require('passport-linkedin-oauth2').Strategy
  , FacebookStrategy = require('passport-facebook').Strategy
  , TwitterStrategy = require('passport-twitter').Strategy
  , InstagramStrategy = require('passport-instagram').Strategy
  , FoursquareStrategy = require('passport-foursquare').Strategy
  , GoogleStrategy = require('passport-google-oauth').OAuth2Strategy
  , VKontakteStrategy = require('passport-vkontakte').Strategy
  , auth = require('./helpers/auth.js')
  , session = require('express-session')
  , port = process.env.PORT || 3000;

process.on('uncaughtException', function (err) {
   logger.error(err.stack);
});

var opt = {  
  server:{
       socketOptions: { keepAlive: 1}
  }
};

app.use(session({ secret: 'blah', name: 'id' }))
app.set('secret', cfg.JSONToken.secret)
app.set('views', cfg.rootPath + '/views')
app.engine('jade', require('jade').__express)
app.set('view engine', 'jade')

app.use(express.static(cfg.rootPath + '/public'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(morgan('combined', {
    "stream": logger.stream
}))
app.use(passport.initialize());
app.use(require('./controllers'));
app.get('*', errorhandler.handler_404);

app.use(bodyParser.urlencoded({extended: true}))

passport.use(new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback : true
  }, auth.localAuth));

passport.use(new FacebookStrategy({
    clientID: cfg.facebook.apiKey,
    clientSecret: cfg.facebook.apiSecret,
    callbackURL: cfg.facebook.callback,
    profileFields: cfg.facebook.fields,
    passReqToCallback: true
  }, auth.facebookAuth));

passport.use(new LinkedInStrategy({
    clientID: cfg.linkedin.apiKey,
    clientSecret: cfg.linkedin.apiSecret,
    callbackURL: cfg.linkedin.callback,
    scope: cfg.linkedin.profileFields,
    passReqToCallback: true
  }, auth.linkedinAuth));

passport.use(new TwitterStrategy({
  consumerKey: cfg.twitter.apiKey,
  consumerSecret: cfg.twitter.apiSecret,
  callbackURL: cfg.twitter.callback,
  passReqToCallback: true
}, auth.twitterAuth));

passport.use(new FoursquareStrategy({
  clientID: cfg.foursquare.secrets.clientId,
  clientSecret: cfg.foursquare.secrets.clientSecret,
  callbackURL: cfg.foursquare.secrets.redirectUrl,
  passReqToCallback: true
}, auth.foursquareAuth));

passport.use(new InstagramStrategy({
  clientID: cfg.instagram.clientId,
  clientSecret: cfg.instagram.clientSecret,
  callbackURL: cfg.instagram.callback,
  passReqToCallback: true
}, auth.instagramAuth));

passport.use(new GoogleStrategy({
  clientID: cfg.googleplus.clientId,
  clientSecret: cfg.googleplus.clientSecret,
  callbackURL: cfg.googleplus.callback,
  passReqToCallback: true
}, auth.googleAuth));

passport.use(new VKontakteStrategy({
  clientID: cfg.vk.clientId,
  clientSecret: cfg.vk.clientSecret,
  callbackURL: cfg.vk.callback,
  profileFields: cfg.vk.profileFields,
  passReqToCallback: true
}, auth.vkAuth));
  
passport.serializeUser(function(user, done){
    return done(null, user);
});

passport.deserializeUser(function(obj, done){
    return done(null, obj);
});

app.use(errorhandler.logerror);
app.use(errorhandler.handler_500);
app.use(errorhandler.render_404);
app.use(errorhandler.render_500);

app.use(function(req, res, next) {
  var domain = createDomain();
  domain.on('error', function(err) {
    // alternative: next(err)
    res.statusCode = 500;
    res.end(err.message + '\n');
    domain.dispose();
  });

  domain.enter();
  next();
});

logger.debug("Start Appy Service....");

httpServer = http.createServer(app);
httpServer.listen(port, function(){
  logger.debug("Worker %d is ready (:%d)", process.pid, port)
});
