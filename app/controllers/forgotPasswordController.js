var crypto = require('crypto'),
    Model = require('../model/models.js'),
    nodemailer = require('nodemailer'),
    async = require('async');

var passport = require('passport');

module.exports.forgot = function(req, res, next) {
  async.waterfall([ // waterfall runs the tasks array [] of functions in series, each passing their results to the next in the array.
    function(done) {
      // randomaly generate a hex token with crypto
      crypto.randomBytes(10, function(err, buf) {
        var token = buf.toString('hex');
        done(err, token);
      });
    },
    function(token, done) {
      Model.PropertyManager.findOne({ where: { 'email': req.body.email }}).then(function(user) {
        if (!user) {
          req.flash('error', 'No account with that email address exists.');
          return res.redirect('/forgot');
        }
        user.resetPasswordToken = token;
        user.resetPasswordExpires = Date.now() + 3600000; // 1 hour

        // user.save(function(err) {
        //   console.log("HERE2");
        //   done(token, token, user);
        // });
      });
    },
    function(token, user, done) {
      console.log("HERE2");
      var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'xopxopxop6@gmail.com',
          pass: 'nj6GTlNZF46#0Ad3zACR'
        }
      });
      var mailOptions = {
        from: '"Patty" <patty@patty.com>', // sender address
        to: user.email,
        subject: 'Node.js Password Reset',
        text: 'You are receiving this because you have requested the reset of the password for your account.\n\n' +
          'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
          'http://' + req.headers.host + '/reset/' + token + '\n\n' +
          'If you did not request this, please ignore this email and your password will remain unchanged.\n'
      };
      transporter.sendMail(mailOptions, function(err) {
        req.flash('info', 'An e-mail has been sent to ' + user.email + ' with further instructions.');
        done(err, 'done');
      });
    }
  ], function(err) {
    if (err) return next(err);
    res.redirect('/forgot');
  });
};