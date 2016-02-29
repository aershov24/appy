var exp = require('express')
  , passport = require('passport')
  , customMw = require('../middlewares/middleware.js')
  , cfg   =   require('../config.js')
  , UserRepository  = require('../models/users')
  , User = new UserRepository()
  , logger = require('../helpers/logger.js')
  , decoder = require('../helpers/decoder.js')
  , cache = require('../helpers/cache.js')
  , history = require('../helpers/history.js')
  , foursquare = require('node-foursquare')(cfg.foursquare)
  , router = exp.Router();

/**
 * @api {get} /foursquare/search Search venues
 * @apiName Search
 * @apiGroup Foursquare
 */
// http://localhost:3000/foursquare/search?near=Perth,WA&name=laundry&fstoken=DRA12X2VFBVZNVMCKFMJKSXY3V2EOYWV52COJC4JGMPPTG2P
router.get('/search', 
  customMw.isAuthentificated,
  function(req, res) {
  
  logger.debug('Foursquare search...');
  var lat = req.query.lat;
  var lng = req.query.lan;
  var near = req.query.near;
  var name = req.query.name;
  var token = req.query.fstoken;

  foursquare.Venues.search(lat, lng, near, {query: name}, token, function(err, result){
    if (err){
      logger.debug(err);
      return res.json(err);
    }
    return res.json(result);
  });
});

/**
 * @api {get} /foursquare/venue Get venue's details
 * @apiName VenueDetails
 * @apiGroup Foursquare
 */
// http://localhost:3000/foursquare/venue?venueId=552d1f33498e8589de121113&fstoken=DRA12X2VFBVZNVMCKFMJKSXY3V2EOYWV52COJC4JGMPPTG2P
router.get('/venue', customMw.isAuthentificated, function(req, res) {
  logger.debug('Foursquare venue details...');
  var venueId = req.query.venueId;
  var token = req.query.fstoken;
  foursquare.Venues.getVenue(venueId, token, function(err, result){
    if (err) return res.json({error: err});
    return res.json(result);
  });
});

/**
 * @api {get} /foursquare/venue/tips Get venue's tips
 * @apiName VenueTips
 * @apiGroup Foursquare
 */
// http://localhost:3000/foursquare/venue/tips?venueId=552d1f33498e8589de121113&fstoken=DRA12X2VFBVZNVMCKFMJKSXY3V2EOYWV52COJC4JGMPPTG2P
router.get('/venue/tips', customMw.isAuthentificated, function(req, res) {
  logger.debug('Foursquare venue tips...');
  var venueId = req.query.venueId;
  var token = req.query.fstoken;

  foursquare.Venues.getVenueAspect(venueId, 'tips', null, token, function(err, result){
    if (err) return res.json({error: err});
    return res.json(result);
  });
});

/**
 * @api {get} /foursquare/callbacks Foursquare token callback
 * @apiName Callback
 * @apiGroup Foursquare
 */
router.get('/callback', function (req, res) {
  foursquare.getAccessToken({
    code: req.query.code
  }, function (err, accessToken) {
    if(err) {
      logger.error('An error was thrown: ' + error.message);
      res.json(error.message);
    }
    else {
      res.json({foursquareToken: accessToken});
    }
  });
});

/**
 * @api {get} /foursquare/ Get Foursquare token
 * @apiName GetToken
 * @apiGroup Foursquare
 */
router.get('/',  function(req, res) {
  logger.debug('Foursquare authentification...');
  res.writeHead(303, { 'location': foursquare.getAuthClientRedirectUrl() });
  res.end();
});

module.exports = router;