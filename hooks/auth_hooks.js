const { sequelize,User} = require('../models')
const bcrypt = require('bcryptjs')

module.exports = {
    hashPassword: async function(user){
        if (user.password) {
            const salt = await bcrypt.genSaltSync(10, process.env.BCRYPT_STRING);
            user.password = bcrypt.hashSync(user.password, salt);
           }
           return user
          }
        
    } 
