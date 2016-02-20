var exp = require('express')
  , passport = require('passport')
  , logger = require('../helpers/logger.js')
  , mailer = require('../helpers/mailer.js')
  , customMw = require('../middlewares/middleware.js')
  , cfg   =   require('../config.js')
  , User = require('../models/users.js')
  , router = exp.Router();

/**
 * @api {get} /api/sendRawEmail Send raw email to a current user
 * @apiName SendRawEmail
 * @apiGroup Email
 */
router.get('/sendRawEmail', customMw.isAuthentificated, function(req, res) {
  var token = req.body.token || req.query.token || req.headers['x-access-token'];
  User.GetUserByToken(token, function(err, user) {
    
    var from = cfg.mail.from;
    var to = user.email;
    var subject = 'Raw subject';
    var body = 'Raw email';

    mailer.sendRawEmail(from, to, subject, body, function(err, body){
    if (err){
      logger.error('Cant send raw email: %s', err);
      res.json({error: err});
    }
    res.json({message: 'ok'});
    });
  });
});

/**
 * @api {get} /api/sendWelcomeEmail Send welcome email to a current user
 * @apiName SendWelcomeEmail
 * @apiGroup Email
 */
router.get('/sendWelcomeEmail', customMw.isAuthentificated, function(req, res) {
  var token = req.body.token || req.query.token || req.headers['x-access-token'];
  User.GetUserByToken(token, function(err, user) {
    mailer.sendWelcomeEmail(user, function(err, body){
      if (err){
        logger.error('Cant send welcome email: %s', err);
        res.json({error: err});
      }
      res.json({message: 'ok'});
    });
  });
});

/**
 * @api {get} /api/sendEmailWithAttachments Send an email with attachments to a current user
 * @apiName SendEmailWithAttachments
 * @apiGroup Email
 */
router.get('/sendEmailWithAttachments', customMw.isAuthentificated, function(req, res) {
  var token = req.body.token || req.query.token || req.headers['x-access-token'];
  User.GetUserByToken(token, function(err, user) {
    var from = cfg.mail.from;
    var to = user.email;
    var subject = 'Raw subject';
    var body = 'Raw email';
    var files = ['invoice1.txt', 'invoice2.txt'];

    mailer.sendEmailWithAttachment(from, to, subject, body, files, function(err, body){
    if (err){
      logger.error('Cant send an email with attachments: %s', err);
      res.json({error: err});
    }
    res.json({message: 'ok'});
    });
  });
});

module.exports = router;
