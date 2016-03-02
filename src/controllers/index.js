var express = require('express')
  , router = express.Router()
  , customMw = require('../middlewares/middleware.js')
  , logger = require('../helpers/logger.js');

router.use('/users', require('./users'));
router.use('/auth', require('./auth'));
router.use('/history', require('./history'));
router.use('/admin', require('./admin'));
router.use('/mail', require('./mail'));
router.use('/foursquare', require('./foursquare'));
router.use('/locu', require('./locu'));
router.use('/messages', require('./messages'));

router.get('/', customMw.isAuthentificated, function(req, res){
    res.redirect('/users/profile');
});

module.exports = router;