const { Sequelize } = require("sequelize");
const User = require('./model/User');
const dbConfig = require('../config/database');
const Session = require("./model/Session");
const connection = new Sequelize(dbConfig);

User.init(connection);
Session.init(connection)



module.exports = connection;
