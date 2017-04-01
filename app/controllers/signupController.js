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
<<<<<<< HEAD
    req.flash('error', "First Name should only have letters.");
=======
    req.flash('error', "Please, enter a different First Name.");
>>>>>>> bac9f35652679ca8f001b88f60cda89018a06969
    res.redirect('signup');
  }

  if (!validator.isAlpha(lastName)) {
<<<<<<< HEAD
    req.flash('error', "Last Name should only have letters.");
=======
    req.flash('error', "Please, enter a different Last Name.");
>>>>>>> bac9f35652679ca8f001b88f60cda89018a06969
    res.redirect('signup');
  }

  if (password !== password2) {
    req.flash('error', "Please, enter the same password twice.");
    res.redirect('signup');
  }
  
  var newPropertyManager = {
    username: username,
    password: password,
    firstName: firstName,
    lastName: lastName
  };


  Model.PropertyManager.create(newPropertyManager).then(function() {
    res.redirect('/');
  }).catch(function(error) {
    req.flash('error', "Please, choose a different username.");
    res.redirect('/signup');
  });
};