var passport = require('passport'),
    signupController = require('../controllers/signupController.js'),
    propertyMakeController = require('../controllers/propertyMakeController.js'),
    inviteTenantController = require('../controllers/inviteTenantController.js'),
    forgotPasswordController = require('../controllers/forgotPasswordController.js'),
    resetController = require('../controllers/resetController.js'),
    paymentController = require('../controllers/paymentController.js');

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

  router.get('/forgot', function(req, res) {
    res.render('forgot', {
      user: req.user
    });
  });

  router.post('/forgot', forgotPasswordController.forgot);

  router.get('/reset/:token', resetController.find);
  router.post('/reset/:token', resetController.reset);

  router.get('/dashboard', isAuthenticated, function(req, res) {
    res.render('dashboard');
  });

  router.get('/properties', isAuthenticated, propertyMakeController.show);
  router.post('/properties', isAuthenticated, propertyMakeController.createProperty);

  router.get('/invite', isAuthenticated, inviteTenantController.show);
  router.post('/invite', isAuthenticated, inviteTenantController.invite);
    
  // need new payment medium. not using stripe anymore
  // router.get('/payment', isAuthenticated, paymentController.show);
  // router.post('/payment', isAuthenticated, paymentController.pay);

  router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
  });

  return router;
};
