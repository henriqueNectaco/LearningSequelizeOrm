const { Model, DataTypes } = require('sequelize');

class User extends Model {
  static init(sequelize) {
    super.init({
      id: DataTypes.UUID,
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      age: DataTypes.INTEGER
    }, {
      sequelize
    })
  }
}
module.exports = User;  