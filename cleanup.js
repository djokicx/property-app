var Model = require('./app/model/models.js');

module.exports = function(callback) {
  // recreate User table
  Model.User.sync({ force: true }).then(function() {
    // create username with username: user and 
    // password: user
    Model.User.create({
      username: 'user',
      password: 'user',
    }).then(callback);
  });
};

