var Model = require('../model/models.js'),
    validator = require('validator'),
    nodemailer = require('nodemailer');

module.exports.show = function(req, res) {
  res.render('invite');
};

module.exports.invite = function(req, res) {
  var email = req.body.email;

  if (!validator.isEmail(email)) {
    req.flash('error', "Please, enter a valid E-Mail");
    res.redirect('invite');
  }

  // create reusable transporter object using the default SMTP transport
  var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
          user: 'xopxopxop6@gmail.com',
          pass: 'nj6GTlNZF46#0Ad3zACR'
      }
  });

  // setup email data with unicode symbols
  var mailOptions = {
      from: '"Patty" <patty@patty.com>', // sender address
      to: email, // list of receivers
      subject: 'Patty: Your Landlord Invited You.', // Subject line
      text: 'Welcome to Patty, little one', // plain text body
      html: '<b>Hello world ?</b>' // 
  };

  // send mail with defined transport object
  transporter.sendMail(mailOptions, function(error, info) {
      if (error) {
          return console.log(error);
      }
      console.log('Message %s sent: %s', info.messageId, info.response);
  });
};
