var Sequelize = require('sequelize');

var attributes = {
  username: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
    validate: {
      is: /^[a-z0-9\_\-]+$/i,
    }
  },
  email: {
    type: Sequelize.STRING,
    validate: {
      isEmail: true
    }
  },
  firstName: {
    type: Sequelize.STRING,
  },
  lastName: {
    type: Sequelize.STRING,
  },
  password: {
    type: Sequelize.STRING,
  },
  bio: {
    type: Sequelize.TEXT,
  },
  phone: {
    type: Sequelize.INTEGER,
  },
  properties: {
    type: Sequelize.ARRAY(Sequelize.TEXT),
  },
  tenants: {
    type: Sequelize.ARRAY(Sequelize.TEXT),
  },
  billingInfo: {
    type: Sequelize.TEXT,
  }

};

var options = {
  freezeTableName: true
};

module.exports.attributes = attributes;
module.exports.options = options;