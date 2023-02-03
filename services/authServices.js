const { User } = require('../models')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');



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
        const user = await User.create({
            username ,
            first_name,
            last_name,
            phonenumber,
            email,
            password,
            role
        });
        token = this.signToken(user.id)

        let respObj = {
            id: user.id,
            uuid: user.uuid,
            username: user.username,
            first_name: user.first_name,
            last_name: user.last_name,
            phonenumber: user.phonenumber,
            email: user.email,
            role: user.role,
            stack: user.stack,
            nationality: user.nationality,
            age: user.age
        }
        respObj.token = token

        payload = { respObj }
        return payload
    },
    signIn: async function(query){
        const { username, password } = query.body
        let password_check 
        if (!username || !password) {
            throw new Error('Please provide username and password');
        }
        
        let user = await User.findOne({ where: { username } })

        if (user) {
            password_check = await bcrypt.compare(password, user.password)
        }

        if (!user || !password_check) { 
            throw new Error('Incorrect username or password')
        }
        let sendToken = await this.createSendToken(user)
        let respObj = {
            id: user.id,
            uuid: user.uuid,
            username: user.username,
            first_name: user.first_name,
            last_name: user.last_name,
            phonenumber: user.phonenumber,
            email: user.email,
            role: user.role,
            stack: user.stack,
            nationality: user.nationality,
            age: user.age
        }

        respObj.sendToken = sendToken

        payload = { respObj }
        return payload
    },

    protect: async function(req){
        try {
            let token;
        if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
            token = req.headers.authorization.split(' ')[1];
        } else if (req?.headers?.cookies?.jwt) {
            token = req.cookies.jwt
        }
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            const userExist = await User.findOne({ where: { id: decoded.id } }).catch((err) => { throw new Error('This user does not exist anymore') })

            req.user = userExist
            return req
    }catch(err){
            throw new Error('Please log in or Invalid User')
        }

        
    }
    
}