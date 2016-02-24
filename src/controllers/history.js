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
  , router = exp.Router();

/**
 * @api {get} /history/getDiff Get diff between two objects from history db
 * @apiName GetDiff
 * @apiGroup History
 */
router.get('/getDiff/:id1/:id2', customMw.isAuthentificated, function(req, res) {
  var token = req.body.token || req.query.token || req.headers['x-access-token'];
  decoder.getObjectByToken(token, function(err, id){
    if (err) { return res.status(401).json({ error: err });  }
    cache.fetchUser(id, function(err, user) {
      if (err) { return res.status(401).json({ error: err });  }
      history.getDiff(req.params.id1, req.params.id2, function(err, df){
        if (err) { return res.status(401).json({ error: err });  }
        return res.json({ diff: df});
      });
    });
  });
});

/**
 * @api {get} /history/getHistory/:objectId Get object's history
 * @apiName GetObjectHistory
 * @apiGroup History
 */
router.get('/getHistory/:objectId', customMw.isAuthentificated, function(req, res) {
  var token = req.body.token || req.query.token || req.headers['x-access-token'];
  decoder.getObjectByToken(token, function(err, id){
    if (err) { return res.status(401).json({ error: err });  }
    cache.fetchUser(id, function(err, user) {
      if (err) { return res.status(401).json({ error: err });  }
      history.getHistory(req.params.objectId, function(err, rows){
        if (err) { return res.status(401).json({ error: err });  }
        return res.json(rows);
      });
    });
  });
});

module.exports = router;
