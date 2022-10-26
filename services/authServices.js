const { sequelize,User} = require('../models')
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const user = require('../models/user');
const bcrypt = require('bcryptjs');
const { promisify } = require('util');
const { nextTick } = require('process');


module.exports = {
    signToken:function(id) {
        signedToken = jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES })
            return signedToken
    },
    createSendToken: async function(user,statusCode,res){
        const token = this.signToken(user.id)

        const cookieOptions = {
            expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 60 * 1000),
            httpOnly:false
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
           throw new Error('Please provide email and password');
        }
        
        const user = await User.findOne({where : {username}})
       

        if (!user || !await bcrypt.compare(password,user.password)) {
            throw new Error('Incorrect username or password')
        }
       
        sendToken = await this.createSendToken(user)
        payload = {user,sendToken}
        return payload
    },

    protect: async function(req){
     try{   let token;

        if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
            token = req.headers.authorization.split(' ')[1];
        }else if(req.cookies.jwt){
            token = req.cookies.jwt
        }
        if(!token){
            throw new Error('Login required')
        }
        const decoded = await promisify(jwt.verify)(token,process.env.JWT_SECRET)
        const userExist = await User.findOne({where: {id:decoded.id}})
        if(!userExist){
            throw new Error('This user does not exist anymore')
        
       
        }
        return userExist
    }catch(err){
            console.log(err)
        }

        
    }
    
}