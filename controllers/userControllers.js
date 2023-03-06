const { User } = require('../models')
const authServices = require('../services/authServices')
const AppError = require('./error')
module.exports = {
    async signUp(req, res) {
        const data = req.body
        try {

            const newUser = await authServices.registerUser(data)
            //const token = createSendToken(newUser.newUser,201,res)
            return res.status(201).json({
                status: 'success',
                message: "User registered",
                data: {
                    newUser,

                }
            })
        }
        catch (err) {
            console.log(err.message)
            AppError(err, req, res)
            // return res.status(500).json(err)
        }
    },

    async getAllUsers(_req, res) {

        try {
            const users = await User.findAll({ include: ['questions'] })
            return res.status(201).json({
                status: "success",
                message: `${users.length} Users found`,
                data: {
                    users
                }
            })
        } catch (err) {
            console.log(err)
            return res.status(500).json(err)
        }
    },


    async signIn(req, res) {
        const data = req.body
        try {
            const payload = await authServices.signIn(data)
            const { token, cookieOptions } = payload.respObj.sendToken
            const user = payload.respObj
            res.cookie('jwt', token, cookieOptions)
            return res.status(201).json({
                status: "success",
                message: `Logged in Succesfully`,
                token,
                data: {
                    user
                }
            })
        } catch (err) {
            console.log(err)


            return res.status(401).json({
                status: 'failed',
                message: "Sorry, Invalid login Parameters 😢🚑",
                data: {
                    message: err.message
                }
            })
        }
    },

    signout(_req, res) {
        res.cookie('jwt', 'loggedout', {
            expires: new Date(Date.now() + 10 + 1000),
            httpOnly: true
        });
        res.status(200).json({
            status: 'success',
             message: "Bye!"
         })
    }


}

