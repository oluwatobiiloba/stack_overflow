'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Votes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Answers , User }) {
      // define association here
      this.belongsTo(Answers, { foreignKey: 'answerId', as : 'answer'})
      this.hasMany(User,{ foreignKey: 'userId', as: 'voters'})
    }
  }
  Votes.init({
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    answerId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    upvotes: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    downvotes: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  }, {
    sequelize,
    tableName: 'votes',
    modelName: 'Votes',
  });
  return Votes;
};