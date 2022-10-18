'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Questions , Answers}) {
      // define association here
      this.hasMany( Questions ,{ foreignKey:'userId', as : 'questions'});
      this.hasMany( Answers ,{ foreignKey:'userId', as : 'answers'})
    }

    toJSON(){
      return { ...this.get(),id: undefined}
    }
  }
  User.init(
    {
      uuid:{
        type:DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true ,
        validate:{
          isAlphanumeric:{
            msg:"Username can only contain alphanumeric characters"
          },
          notNull:{
            msg:"Username cannot be null"
          },
          notEmpty:{
            msg:"Field cannot be empty"
          }
        }
        
      },
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
        notNull:{
          msg:"Username cannot be null"
        },
        notEmpty:{
          msg:"Field cannot be empty"
        }}
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
        notNull:{
          msg:"Username cannot be null"
        },
        notEmpty:{
          msg:"Field cannot be empty"
        }
    }
    },
    phonenumber: {
      type:DataTypes.BIGINT,
      allowNull: false,
      validate:{
        notNull:{
          msg:"Username cannot be null"
        },
        notEmpty:{
          msg:"Field cannot be empty"
        }
    }
    },
    email: {
      type: DataTypes.STRING,
      allowNull:false,
      validate:{
        isEmail:{
          msg:"Enter a valid email"
        }
      }
    },
    password:{
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
        notNull:{
          msg:"Please enter a valid password"
        }
      }
    },
    role: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },
    stack: DataTypes.STRING,
    age: DataTypes.STRING,
    nationality: DataTypes.STRING
  }, {
    sequelize,
    tableName:'users',
    modelName: 'User',
  });
  // User.associate = (models) => {
  //   User.hasOne(models.Roles,{foreignKey: 'role_id'})
  // }
  return User;
};