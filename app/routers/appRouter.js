var passport = require('passport'),
    forgotPasswordController = require('../controllers/forgotPasswordController.js'),
    inviteTenantController = require('../controllers/inviteTenantController.js'),
    paymentController = require('../controllers/paymentController.js'),
    propertyMakeController = require('../controllers/propertyMakeController.js'),
    resetController = require('../controllers/resetController.js'),
    signupController = require('../controllers/signupController.js');

module.exports = function(express) {
  var router = express.Router();

  var isAuthenticated = function (req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    req.flash('error', 'You have to be logged in to access the page.');
    res.redirect('/');
  };

  // var isPropertyManager = function (req, res, next) {
  //   passport.authenticate('propertyManager'), function(req, res, next) {
  //     return next;
  //   }
  //   req.flash('error', 'You have to be logged in and/or a property manager to access the page.');
  //   res.redirect('/');
  // }

  // var isTenant = function (req, res, next) {
  //   passport.authenticate('tenant'), function(req, res, next) {
  //     return next;
  //   }
  //   req.flash('error', 'You have to be logged in and/or a tenant to access the page.');
  //   res.redirect('/');
  // }
  
  router.get('/signup', signupController.show);
  router.post('/signup', signupController.signup);

  router.get('/', function(req, res) {
    res.render('home');
  });

  router.post('/login',
    passport.authenticate(['propertyManager', 'tenant']),
      function(req, res) {
        if (req.user.userType == "propertyManager") {
          res.redirect('/dashboard');
        } else if (req.user.userType == "tenant") {
          res.redirect('tenantDashboard');
        }
        else {
          req.flash('error', 'You have to be logged in to access the page.');
          res.redirect('/');
        }
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

  router.get('/tenantDashboard', isAuthenticated, function(req, res) {
    res.render('tenantDashboard');
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
