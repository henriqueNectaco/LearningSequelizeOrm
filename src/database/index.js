const { Sequelize } = require("sequelize");
const User = require('./model/User');
const dbConfig = require('../config/database');
const connection = new Sequelize(dbConfig);

// Inicializa o modelo
User.init(connection);

// Sincroniza o modelo com o banco de dados (isso cria a tabela se ela ainda não existir)


module.exports = connection;
