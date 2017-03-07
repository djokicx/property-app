var Sequelize = require('sequelize'),
    sequelize = new Sequelize(DATABASE_URL);
module.exports = sequelize;