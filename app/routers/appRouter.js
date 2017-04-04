var passport = require('passport'),
    signupController = require('../controllers/signupController.js');
    propertyMakeController = require('../controllers/propertyMakeController.js');

module.exports = function(express) {
  var router = express.Router();

  var isAuthenticated = function (req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    req.flash('error', 'You have to be logged in to access the page.');
    res.redirect('/');
  };
  
  router.get('/signup', signupController.show);
  router.post('/signup', signupController.signup);

  router.post('/login', passport.authenticate('propertyManager', {
      successRedirect: '/dashboard',
      failureRedirect: '/',
      failureFlash: true
  }));

  router.get('/', function(req, res) {
    res.render('home');
  });

  router.get('/dashboard', isAuthenticated, function(req, res) {
    res.render('dashboard');
  });

  router.get('/properties', isAuthenticated, propertyMakeController.show);
  router.post('/properties', isAuthenticated, propertyMakeController.createProperty);

  router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
  });

  return router;
};