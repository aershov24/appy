var exp = require('express')
  , passport = require('passport')
  , customMw = require('../middlewares/middleware.js')
  , cfg   =   require('../config.js')
  , User = require('../models/users.js')
  , logger = require('../helpers/logger.js')
  , mailer = require('../helpers/mailer.js')
  , smssender = require('../helpers/smssender.js')
  , decoder = require('../helpers/decoder.js')
  , cache = require('../helpers/cache.js')
  , router = exp.Router();

/**
 * @api {get} /api/sendSMSMessage Send SMS message to a phone number
 * @apiName SendSMSMessage
 * @apiGroup SMS
 */
router.get('/sendSMSMessage/:number', customMw.isAuthentificated, function(req, res) {
  var token = req.body.token || req.query.token || req.headers['x-access-token'];
  decoder.getObjectByToken(token, function(err, id){
    if (err) { return res.status(401).json({ error: err });  }
    cache.fetchUser(id, function(err, user) {
      if (err) { return res.status(401).json({ error: err });  }
      var to = req.params.number;
      var body = 'SMS message';
      smssender.sendSMSMessage(to, body, function(err, body){
        if (err) return res.json({error: err});
        return res.json({message: 'ok'});
      });
    });
  });
});

/**
 * @api {get} /api/sendRawEmail Send raw email to a current user
 * @apiName SendRawEmail
 * @apiGroup Email
 */
router.get('/sendRawEmail', customMw.isAuthentificated, function(req, res) {
  var token = req.body.token || req.query.token || req.headers['x-access-token'];
  decoder.getObjectByToken(token, function(err, id){
    if (err) { return res.status(401).json({ error: err });  }
    cache.fetchUser(id, function(err, user) {
      if (err) { return res.status(401).json({ error: err });  }
      var from = cfg.mail.from;
      var to = user.email;
      var subject = 'Raw subject';
      var body = 'Raw email';
      mailer.sendRawEmail(from, to, subject, body, function(err, body){
        if (err) return res.json({error: err});
        return res.json({message: 'ok'});
      });
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
  decoder.getObjectByToken(token, function(err, id){
    if (err) { return res.status(401).json({ error: err });  }
    cache.fetchUser(id, function(err, user) {
      if (err) { return res.status(401).json({ error: err });  }
      mailer.sendWelcomeEmail(user, function(err, body){
        if (err) return res.json({error: err});
        return res.json({message: 'ok'});
      });
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
  decoder.getObjectByToken(token, function(err, id){
    if (err) { return res.status(401).json({ error: err });  }
    cache.fetchUser(id, function(err, user) {
      if (err) { return res.status(401).json({ error: err });  }

      var from = cfg.mail.from;
      var to = user.email;
      var subject = 'Raw subject';
      var body = 'Raw email';
      var files = ['invoice1.txt', 'invoice2.txt'];

      mailer.sendEmailWithAttachment(from, to, subject, body, files, function(err, body){
        if (err) return res.json({error: err});
        return res.json({message: 'ok'});
      });
    });
  });
});

module.exports = router;
