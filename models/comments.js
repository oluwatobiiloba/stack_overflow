'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comments extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User, Answers}) {
      // define association here
      this.belongsTo(Answers, {foreignKey: 'answerId', as: 'answers' })
      this.belongsTo(User, {foreignKey: 'userId',as: 'user'})
    }
  }
  Comments.init({
    userId: DataTypes.INTEGER,
    answerId: DataTypes.INTEGER,
    comment: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Comments',
  });
  return Comments;
};