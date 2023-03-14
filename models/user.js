'use strict';
const { Model } = require('sequelize');
const worker_pool = require('../worker-pool/init');
const auth_hooks = require('../hooks/auth_hooks')

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Questions, Answers, verify_user }) {
      // define association here
      this.hasMany( Questions ,{ foreignKey:'userId', as : 'questions'});
      this.hasMany(Answers, { foreignKey: 'userId', as: 'answers' });
      this.hasOne(verify_user, { foreignKey: 'user_id', as: 'verify_user' })
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
    },
    unique: true 
    },
    email: {
      type: DataTypes.STRING,
      allowNull:false,
      validate:{
        isEmail:{
          msg:"Enter a valid email"
        }
      },
      unique: true
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
      passwordResetToken: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      is_verified: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
    role: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },
    stack: DataTypes.STRING,
      profile_image: DataTypes.STRING,
      meta: DataTypes.STRING,
    age: DataTypes.STRING,
    nationality: DataTypes.STRING
    }, {
      defaultScope: {
        attributes: {
          exclude: ['password']
        }
      },
      sequelize,
    tableName:'users',
    modelName: 'User',
  });
  User.beforeBulkUpdate((user) => {
    if (user.attributes.password) {
      user = user.attributes;
      const pool = worker_pool.get_proxy();
      return new Promise((resolve, reject) => {
        switch (true) {
          case pool !== null:
            pool.bcryptHashing(user.password).then(hashedPw => {
              user.password = hashedPw
              resolve(user);
            }).catch(err => {
              reject(err);
            });
            break;
          default:
            // If no worker pool, fallback to auth_hooks.hashPassword method
            user.password = auth_hooks.hashPassword(user.password);
            resolve(user);
            break;
        }
      })
    }
    return user;
  });
  User.beforeCreate((user) => {
    const pool = worker_pool.get_proxy();
    return new Promise((resolve, reject) => {
      switch (true) {
        case pool !== null:
          pool.bcryptHashing(user.password).then(hashedPw => {
            user.password = hashedPw
            resolve(user);
          }).catch(err => {
            reject(err);
          });
          break;
        default:
          // If no worker pool, fallback to auth_hooks.hashPassword method
          user.password = auth_hooks.hashPassword(user.password);
          resolve(user);
          break;
      }
    });
  });


  // User.associate = (models) => {
  //   User.hasOne(models.Roles,{foreignKey: 'role_id'})
  // }
  return User;
};