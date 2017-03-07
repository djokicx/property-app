var Sequelize = require('sequelize'),
    sequelize = new Sequelize(process.env.DATABASE_URL);
module.exports = sequelize;