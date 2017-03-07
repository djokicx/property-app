var UserMeta = require('./User.js'),
    connection = require('../sequelize.js');

// models defined with sequelize.define ('name', {attributes}, {options})
var User = connection.define('users', UserMeta.attributes, UserMeta.options);

// you can define relationships here

module.exports.User = User;