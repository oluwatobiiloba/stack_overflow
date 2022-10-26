const { sequelize,User} = require('../models')
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const user = require('../models/user');
const bcrypt = require('bcryptjs')


module.exports = {
    signToken:function(id) {
        signedToken = jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES })
            return signedToken
    },
    createSendToken: async function(data){
        const {user,statusCode,res} = data
        const token = this.signToken(user.id)
        console.log(token)

        const cookieOptions = {
            expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES_IN),
            httpOnly:true
        }
        
        payload = {cookieOptions,token}
 
        return payload
    },
    registerUser: async function(query){
        const {username ,first_name,last_name,phonenumber,email,password,role} = query.body
        const newUser = await User.create({
            username ,
            first_name,
            last_name,
            phonenumber,
            email,
            password,
            role});
            console.log(newUser.id)
        token = this.signToken(newUser.id)
        payload = {token,newUser}
        return payload
    },
    signIn: async function(query){
        const {username,password} = query.body
        
        if (!username || !password) {
            return new Error('Please provide email and password');
        }
                const user = await User.findOne({where : {uuid: 'b3884b19-5314-4f1b-abe3-2b6dedae41f2'}})
        console.log(user)

        if (!user || !await bcrypt.compare(password,user.password)) {
            return new Error('Incorrect username or password')
        }

        this.createSendToken(user)
        // return user
    }
}