var express = require('express')
  , router = express.Router()
  , customMw = require('../middlewares/middleware.js')
  , logger = require('../helpers/logger.js');

router.use('/users', require('./users'));
router.use('/auth', require('./auth'));
router.use('/api', require('./api'));

router.get('/', customMw.isAuthentificated, function(req, res){
    res.redirect('/users/profile');
});

module.exports = router;