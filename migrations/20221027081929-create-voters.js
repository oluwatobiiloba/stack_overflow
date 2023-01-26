'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('voters', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      answerId: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      upvotes: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        allowNull:true
      },
      downvotes: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        allowNull:true
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
    await queryInterface.dropTable('voters');
  }
};