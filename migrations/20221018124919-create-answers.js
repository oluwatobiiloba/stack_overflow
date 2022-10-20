'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('answers', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      uuid:{
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      answer: {
        type: Sequelize.STRING,
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
      downvotes: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      upvotes: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      accepted: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      questionId: {
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
    await queryInterface.dropTable('answers');
  }
};