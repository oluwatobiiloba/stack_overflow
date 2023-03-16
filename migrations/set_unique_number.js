'use strict';

module.exports = {
    up: async (queryInterface) => {
        await queryInterface.addConstraint('users', {
            type: 'unique',
            fields: ['phonenumber'],
            name: 'unique_phonenumber'
        });
    },

    down: async (queryInterface) => {
        await queryInterface.removeConstraint('Users', 'unique_email');
    }
};
