'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('users', {
      uuid:{
        type:Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      username: {
        type: Sequelize.STRING,
        allowNull: false,
        unique:  {
          name: true,
          msg: "Username has already been assigned"
        },
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
      password:{
        type: Sequelize.STRING,
        allowNull: false,
        validate:{
          notNull:{
            msg:"Please enter a valid password"
          }
        }
      },
      first_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      last_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      phonenumber: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      role: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 1,
      },
      stack: {
        type: Sequelize.STRING
      
      },
      age: {
        type: Sequelize.STRING
      },
      nationality: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('users');
  }
};