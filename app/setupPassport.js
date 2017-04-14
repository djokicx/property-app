var passport = require('passport'),
    LocalStrategyPropertyManager = require('passport-local').Strategy,
    LocalStrategyTenant = require('passport-local').Strategy,
    Model = require('./model/models.js'),
    bcrypt = require('bcrypt-nodejs');

module.exports = function(app) {
  app.use(passport.initialize());
  app.use(passport.session());

  // property manager local strategy login check
  passport.use('propertyManager', new LocalStrategyPropertyManager(
    function(username, password, done) {
      Model.PropertyManager.findOne({
        where: {
          'username': username
        }
      }).then(function (propertyManager) {
        if (propertyManager === null) {
          return done(null, false, { message: 'Incorrect credentials.' });
        }
        
        var hashedPassword = bcrypt.hashSync(password, propertyManager.salt);
        
        if (propertyManager.password === hashedPassword) {
          return done(null, propertyManager);
        }
        
        return done(null, false, { message: 'Incorrect credentials.' });
      });
    }
  ));

  // tenant local strategy login check
  passport.use(new LocalStrategyTenant(
    function(username, password, done) {
      Model.Tenant.findOne({
        where: {
          'username': username
        }
      }).then(function (tenant) {
        if (tenant === null) {
          return done(null, false, { message: 'Incorrect credentials.' });
        }
        
        var hashedPassword = bcrypt.hashSync(password, tenant.salt);
        
        if (tenant.password === hashedPassword) {
          return done(null, tenant);
        }
        
        return done(null, false, { message: 'Incorrect credentials.' });
      });
    }
  ));

  // property manager serialize
  passport.serializeUser(function(propertyManager, done) {
    done(null, propertyManager.id);
  });
  // property manager deserialize
  passport.deserializeUser(function(id, done) {
    Model.PropertyManager.findOne({
      where: {
        'id': id
      }
    }).then(function (propertyManager) {
      if (propertyManager === null) {
        done(new Error('Wrong user id.'));
      }
      
      done(null, propertyManager);
    });
  });


  // tenant serialize
  passport.serializeUser(function(tenant, done) {
    done(null, tenant.id);
  });
  // tenant deserialize
  passport.deserializeUser(function(id, done) {
    Model.Tenant.findOne({
      where: {
        'id': id
      }
    }).then(function (tenant) {
      if (tenant === null) {
        done(new Error('Wrong user id.'));
      }
      
      done(null, tenant);
    });
  });

};
