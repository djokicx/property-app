var Model = require('../model/models.js');
var validator = require('validator');

module.exports.show = function(req, res) {
  res.render('signup');
};

module.exports.signup = function(req, res) {
  var username = req.body.username;
  var password = req.body.password;
  var password2 = req.body.password2;
  var firstName = req.body.firstName;
  var lastName = req.body.lastName;

  if (!username || !password || !password2 || !firstName || !lastName) {
    req.flash('error', "Please, fill in all the fields.");
    res.redirect('signup');
  }
  
  if (!validator.isAlpha(firstName)) {
    req.flash('error', "First Name should only have letters.");
    res.redirect('signup');
  }

  if (!validator.isAlpha(lastName)) {
    req.flash('error', "Last Name should only have letters.");
    res.redirect('signup');
  }

  if (password !== password2) {
    req.flash('error', "Please, enter the same password twice.");
    res.redirect('signup');
  }
  
  var newPropertyManager = {
    username: username,
    password: password
  };


  Model.PropertyManager.create(newPropertyManager).then(function() {
    res.redirect('/');
  }).catch(function(error) {
    req.flash('error', "Please, choose a different username.");
    res.redirect('/signup');
  });
};