'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('questions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      uuid:{
        type:Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      question: {
        type: Sequelize.STRING,
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
        type: Sequelize.INTEGER,
        defaultValue: 0,
        allowNull: false
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false
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
    await queryInterface.dropTable('questions');
  }
};