'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.addConstraint('users', {
            type: 'unique',
            fields: ['phonenumber'],
            name: 'unique_phonenumber'
        });
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.removeConstraint('Users', 'unique_email');
    }
};
