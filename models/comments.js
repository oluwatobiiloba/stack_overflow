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
    uuid:{
      type:DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    answerId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    comment: {
    type: DataTypes.STRING,
    allowNull:false,
    validate: {
      notNull: {
        msg: 'Please provide a comment'
      },
      notEmpty:{
        msg: 'Please provide a comment'
      }
    }}
  }, {
    sequelize,
    tableName: 'comments',
    modelName: 'Comments',
  });
  return Comments;
};