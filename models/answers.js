'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Answers extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Questions, Comments}) {
      // define association here
      this.belongsTo(Questions, { foreignKey: 'questionId', as: 'question'});
      this.hasMany(Comments, { foreignKey: 'comments', as: 'comments'})
    }
  }
  Answers.init({
    uuid:{
      type:DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    answer: {
      type: DataTypes.STRING,
      allowNull:false,
      validate: {
        notNull: {
          msg: 'Please provide an answer'
        },
        notEmpty:{
          msg: 'Please provide a message'
        }
      }
    },
    downvotes: DataTypes.INTEGER,
    upvotes: DataTypes.INTEGER,
    accepted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    questionId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    comments: DataTypes.STRING
  }, {
    sequelize,
    tableName: 'answers',
    modelName: 'Answers',
  });
  return Answers;
};