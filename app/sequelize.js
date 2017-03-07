var Sequelize = require('sequelize'),
    sequelize = new Sequelize('postgres://kqzuudiybvvjga:fc3f868e4aabc55e61df000f2a23b731a3f9fb1ef8463e759dc73bb8bef9417d@ec2-54-225-230-243.compute-1.amazonaws.com:5432/da0m065jeo785q');
module.exports = sequelize;