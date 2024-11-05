const { Model, DataTypes } = require('sequelize');

class Session extends Model {
  static init(sequelize) {
    super.init({
      user_id: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      acess_token: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      jwt_token: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4, // Gera automaticamente o UUID
        allowNull: false,
        primaryKey: true,
      },
    }, {
      sequelize,
      tableName: 'sessions', // Nome da tabela
      timestamps: true, // Ativa os campos createdAt e updatedAt automaticamente
      createdAt: 'created_at', // Define o nome do campo createdAt
      updatedAt: 'updated_at', // Define o nome do campo updatedAt
    });
  }
}

module.exports = Session;
