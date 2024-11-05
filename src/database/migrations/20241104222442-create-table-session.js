'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('sessions', { // Nome da tabela
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: Sequelize.UUIDV4, // Gera automaticamente o UUID
      },
      user_id: {
        type: Sequelize.STRING,
        allowNull: false
      },
      acess_token: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      jwt_token: {
        type: Sequelize.STRING,
        allowNull: false
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('NOW'), // Adiciona o timestamp padrão
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('NOW'), // Adiciona o timestamp padrão
      },
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('sessions'); // Nome da tabela
  }
};
