'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Email_Templates extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Email_Templates.init({
    Name: DataTypes.STRING,
    html_content: DataTypes.STRING
  }, {
    sequelize,
    tableName: 'email_templates',
    modelName: 'Email_Templates',
  });
  return Email_Templates;
};