'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Questions extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate( { User , Answers } ) {
      // define association here
      this.belongsTo(User, { foreignKey: 'userId', as: 'user'});
      this.hasMany( Answers ,{ foreignKey:'questionId', as : 'answers'})
    }

    toJSON(){
      return { ...this.get(),id: undefined, userId: undefined}
    }
  }
  Questions.init({
    uuid:{
      type:DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    question: {
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
        notNull:{
          msg:"Please enter a question"
        },
        notEmpty:{
          msg:"Please enter a message"
        }
      }
    },
    status: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'questions',
    modelName: 'Questions',
  });
  return Questions;
};