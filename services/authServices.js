const { User } = require('../models')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('../config/config')[process.env.NODE_ENV || 'development'];

module.exports = {
    signToken: function (id) {
        console.log(config.JWT_SECRET)
        let signedToken = jwt.sign({ id }, config.JWT_SECRET, { expiresIn: config.JWT_EXPIRES })
            return signedToken
    },
    createSendToken: function (user, statusCode, res) {
        const token = this.signToken(user.id)

        const cookieOptions = {
            expires: new Date(Date.now() + config.JWT_COOKIE_EXPIRES_IN * 60 * 1000),
            httpOnly:false
        }
        
        let payload = { cookieOptions, token }

        return payload
    },
    registerUser: async function (data) {
        const { username, first_name, last_name, phonenumber, email, password, role } = data
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
    signIn: async function (data) {
        const { username, password } = data
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
        let sendToken = this.createSendToken(user)
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

        let token;
        let decoded
        if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
            token = req.headers.authorization.split(' ')[1];
        } else if (req.headers.cookies.jwt) {
            token = req.headers.cookies.jwt
        }
        try {
            decoded = jwt.verify(token, process.env.JWT_SECRET)
        } catch (error) {
            throw new Error('Not Authorized');
        }
        const userExist = await User.findOne({ where: { id: decoded.id } }).catch((err) => { throw new Error('This user does not exist anymore') })

        req.user = userExist
        return req
        
    }


}


