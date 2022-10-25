const { sequelize,User} = require('../models')
const jwt = require('jsonwebtoken');
const crypto = require('crypto');


module.exports = {
    signToken: async function () {
        const signToken = id => {
            return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES })
        }
    },
    registerUser: async function(query){
        
    }
}