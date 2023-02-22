const { User, sequelize } = require('../models')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('../config/config')[process.env.NODE_ENV || 'development'];


module.exports = {
    signToken(id) {
        const signedToken = jwt.sign({ id }, config.JWT_SECRET, { expiresIn: config.JWT_EXPIRES })
            return signedToken
    },
    createSendToken(user, _statusCode, _res) {
        const token = this.signToken(user.id)

        const cookieOptions = {
            expires: new Date(Date.now() + config.JWT_COOKIE_EXPIRES_IN * 60 * 1000),
            httpOnly:false
        }
        
        const payload = { cookieOptions, token }

        return payload
    },
    registerUser(data) {
        const { username, first_name, last_name, phonenumber, email, password, role } = data
        return sequelize.transaction((t) => {
            return User.create({ username, first_name, last_name, phonenumber, email, password, role }, { transaction: t })
        }).then((user) => {
            const token = this.signToken(user.id)
            const respObj = {
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
            return { respObj };
        }).catch((err) => {
            throw err
        })
    },
    async signIn(data) {
        const { username, password } = data
        let password_check 
        if (!username || !password) {
            throw new Error('Please provide username and password');
        }
        
        let user = await User.unscoped().findOne({ where: { username } })

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

    async protect(token) {
        let decoded = null;
        try {
            decoded = jwt.verify(token, config.JWT_SECRET)
        } catch (error) {
            throw new Error('Not Authorized')
        }
        const userExist = await User.findOne({ where: { id: decoded.id } })
        if (!userExist) {
            throw new Error('This user does not exist anymore')
        }
        return userExist
    }
}


