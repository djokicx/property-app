var Model = require('../model/models.js');

module.exports.show = function(req, res) {
  res.render('signup');
};

module.exports.signup = function(req, res) {
  var username = req.body.username;
  var password = req.body.password;
  var password2 = req.body.password2;
  
  if (!username || !password || !password2) {
    req.flash('error', "Please, fill in all the fields.");
    res.redirect('signup');
  }
  
  if (password !== password2) {
    req.flash('error', "Please, enter the same password twice.");
    res.redirect('signup');
  }
  
  var newUser = {
    username: username,
    password: password
  };


  Model.User.create(newUser).then(function() {
    res.redirect('/');
  }).catch(function(error) {
    req.flash('error', "Please, choose a different username.");
    res.redirect('/signup');
  });
};