var cfg = require('../config.js')
  , path = require('path')
  , logger = require('../helpers/logger.js')
  , mailgun = require('mailgun-js')(cfg.mailgun)
  , resources = require('../models/resources.js')
  , EmailTemplate = require('email-templates').EmailTemplate;

renderWelcomeEmail = function(user, cb){
  var templateDir = path.join(cfg.templatesPath, 'welcome-email')
  var welcomeEmail = new EmailTemplate(templateDir);
  welcomeEmail.render(user, function (err, result) {
    if (err){ 
      logger.error(err);
      return cb (err, null);
    }
    return cb(null, result);
  })
};

sendWelcomeEmail = function(user, cb){
  renderWelcomeEmail(user, function(err, render){
    if (err){
      logger.error(err);
      cb(err, null);
    }

    var data = {
      from: cfg.mail.from,
      to: user.email,
      subject: resources.EMAILS.WelcomeEmailSubject,
      html: render.html 
    };

    mailgun.messages().send(data, function (err, body) {
      if (err){
        logger.error(err);
        return cb(err, null);
      }
      return cb(null, body);
    });
  });
};

sendRawEmail = function(from, to, subject, body, cb){
  var data = {
    from: from,
    to: to,
    subject: subject,
    text: body
  };

  mailgun.messages().send(data, function (err, body) {
    if (err){
      logger.error(err);
      return cb(err, null);
    }
    return cb(null, body);
  });
};

sendEmailWithAttachment = function(from, to, subject, body, files, cb){
  var attachments = [];
  for (var i = 0; i < files.length; i++)
    attachments.push(path.join(cfg.filesPath, files[i]));

  var data = {
    from: from,
    to: to,
    subject: subject,
    text: body,
    attachment: attachments
  };

  mailgun.messages().send(data, function (err, body) {
    if (err) {
      logger.error(err);
      return cb(err, null);
    }
    return cb(null, body);
  });
};

exports.sendRawEmail = sendRawEmail;
exports.sendWelcomeEmail = sendWelcomeEmail;
exports.sendEmailWithAttachment = sendEmailWithAttachment;