var cfg = require('../config.js')
  , logger = require('../helpers/logger.js')
  , mailgun = require('mailgun-js')(cfg.mailgun)
  , path = require('path')
  , resources = require('../models/resources.js')
  , EmailTemplate = require('email-templates').EmailTemplate;

renderWelcomeEmail = function(user, cb){
  var templateDir = path.join(cfg.rootPath, 'templates', 'welcome-email')
  var welcomeEmail = new EmailTemplate(templateDir);
  welcomeEmail.render(user, function (err, result) {
    if (err) cb (err, null);
    cb(null, result);
  })
};

sendWelcomeEmail = function(user, cb){
  renderWelcomeEmail(user, function(err, render){
    logger.debug(render);
    if (err)
      cb(err, null);

    var data = {
      from: cfg.mail.from,
      to: user.email,
      subject: resources.EMAILS.WelcomeEmailSubject,
      html: render.html 
    };

    mailgun.messages().send(data, function (err, body) {
      if (err) 
        cb(err, null);
      cb(null, body);
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
    if (err) 
      cb(err, null);
    cb(null, body);
  });
};

exports.sendRawEmail = sendRawEmail;
exports.sendWelcomeEmail = sendWelcomeEmail;