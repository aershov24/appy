var logger = require('../helpers/logger.js');

exports.logerror = function(err, req, res, next){
    logger.error(err.stack);
    return next(err);
  };
  
exports.handler_404 = function(req, res, next){
    var err;
    logger.error('404: Page not found: %s', req.url);
    err = new Error;
    err.status = 404;
    return next(err);
  };
  
exports.handler_500 = function(err, req, res, next){
    if (req.xhr) {
      return res.status(500).send({
        error: '500 Internal Server Error'
      });
    } else {
      return next(err);
    }
  };
  
exports.render_404 = function(err, req, res, next){
    if (err.status !== 404) {
      return next(err);
    }

    // respond with html page
    if (req.accepts('html')) {
      res.render('404', { url: req.url });
      return;
    }

    // respond with json
    if (req.accepts('json')) {
      res.send({ error: 'Not found' });
      return;
    }

    // default to plain-text. send()
    res.type('txt').send('Not found');
};
  
exports.render_500 = function(err, req, res, next){
    res.status(500);
    // respond with html page
    if (req.accepts('html')) {
      res.render('500', { url: req.url, error: err.stack });
      return;
    }

    // respond with json
    if (req.accepts('json')) {
      res.send({ error: 'Internal Server Error' });
      return;
    }

    // default to plain-text. send()
    res.type('txt').send('Internal Server Error');
  };