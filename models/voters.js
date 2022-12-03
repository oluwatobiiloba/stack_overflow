'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Voters extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Answers }) {
      this.belongsTo(Answers, { foreignKey: 'answerId', as: 'answers'});
      // define association here
    }
  }
  Voters.init({
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    answerId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    upvotes: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull:true
    },
    downvotes: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull:true
    },
  }, {
    sequelize,
    tableName:'voters',
    modelName: 'Voters',
  });
  return Voters;
};