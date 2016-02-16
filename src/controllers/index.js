var express = require('express')
  , router = express.Router()
  , customMw = require('../middlewares/middleware.js')
  , logger = require('../helpers/logger.js');

router.use('/api', require('./api'));

module.exports = router;