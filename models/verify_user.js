'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class verify_user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User }) {
      // define association here
      this.belongsTo(User, { foreignKey: 'user_id', as: 'user' })
    }
  }
  verify_user.init({
    Name: DataTypes.STRING,
    email: DataTypes.STRING,
    verification_token: DataTypes.STRING,
    user_id: DataTypes.INTEGER,
    verification_timestamp: DataTypes.DATE
  }, {
    sequelize,
    tableName: 'verify_users',
    modelName: 'verify_user',
  });
  return verify_user;
};