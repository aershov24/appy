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
  , locu = require('locu')
  , request = require('request')
  , venuesClient = new locu.VenueClient(cfg.locu.apiKey)
  , menuClient = new locu.MenuItemClient(cfg.locu.apiKey)
  , router = exp.Router();

/**
 * @api {get} /locu/search Search venues
 * @apiName Search
 * @apiGroup Foursquare
 */
// http://localhost:3000/locu/search?name=bar&country=Australia&locality=perth
router.get('/search', customMw.isAuthentificated, function(req, res) {
  
  logger.debug('Locu search...');
  var params = {
     name: req.query.name,
     locality: req.query.locality,
     country: req.query.country
  };

  venuesClient.search(params, function(result){
    return res.json(result);
  });
});

locuAPIRequest = function(fields, offset, limit, venueQueries, menuItemQueries, cb){
  var params = {
    api_key: cfg.locu.apiKey,
    fields: fields,
    offset: offset,
    limit: limit,
    venue_queries: venueQueries//,
    //menu_item_queries: menuItemQueries
  };

  var options = {
    uri: 'https://api.locu.com/v2/venue/search',
    method: 'POST',
    json: JSON.stringify(params)
  };
  logger.debug('locu request', JSON.stringify(params));

  request(options, function (err, response, body) {
    if (err){ 
      logger.error(err);
      return cb(err, null);
    }
    return cb(null, body);
  });
}

/**
 * @api {get} /locu/search Search venues
 * @apiName Search
 * @apiGroup Foursquare
 */
// http://localhost:3000/locu/search?name=bar&country=Australia&locality=perth
router.get('/menu/search', customMw.isAuthentificated, 
  function(req, res) {
    logger.debug('Locu menu search...');

    var fields = [ "name" ];
    var venue_queries = [
      {
        //name : req.query.name,
        location : {
          locality: req.query.locality,
          country: req.query.country
        }
      }
    ];

    var menu_item_queries =  [
      {
        name : req.query.name
      }
    ];

    locuAPIRequest(fields, 0, 10, venue_queries, menu_item_queries, function(err, result){
      if (err) { return res.json({ error: err });  }
      return res.json(result);
    });
});

/**
 * @api {get} /locu/search/:foursquareId Search venues by foursquareId
 * @apiName SearchByFoursquareId
 * @apiGroup Foursquare
 */
router.get('/search/:foursquareId', customMw.isAuthentificated, function(req, res) {
  logger.debug('Locu search by externalId...');
  var fields = [ "name"];
  var venue_queries = [
    {
      external : {
        opentable: {
          id: req.params.foursquareId, 
          url: "http://www.opentable.com/rest_profile_menu.aspx?rid=42592"
        }
      }
    }
  ];

  menu_item_queries =  [];

  locuAPIRequest(fields, 0, 10, venue_queries, menu_item_queries, function(err, result){
    if (err) { return res.json({ error: err });  }
    return res.json(result);
  });
});

module.exports = router;