const { User } = require('../models')
const worker_pool = require('../worker-pool/init')
const authServices = require('../services/authServices')
const jwt = require('jsonwebtoken');
const config = require('../config/config')[process.env.NODE_ENV || 'development'];
const AppError = require('./error')
module.exports = {
    async signUp(req, res) {
        const data = req.body
        try {
            const newUser = await authServices.registerUser(data)

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
            return AppError(err, req, res)
            // return res.status(500).json(err)
        }
    },
    async verifyUser(req, res) {
        const token = req.query.token
        try {
            const user = await authServices.verifyEmail(token)
            return res.status(201).json({
                status: 'success',
                message: "User Verified",
                data: {
                    user,
                }
            })

        } catch (err) {
            return res.status(500).json({
                status: 'failed',
                message: err.message
            })
        }
    },
    async forgotPasswordEmail(req, res) {
        const email = req.query.email
        const username = req.query.username

        const data = { email, username }
        try {
            const response = await authServices.forgotPasswordEmail(data)
            return res.status(201).json({
                status: 'success',
                message: response,
            })

        } catch (err) {
            return res.status(500).json({
                status: 'failed',
                message: err.message
            })
        }
    },
    async resetPassword(req, res) {
        const { token, password } = req.body;
        if (!token || !password) {
            return res.status(400).json({
                status: 'failed',
                message: 'Please provide token and password',
            });
        }
        try {
            jwt.verify(token, config.JWT_SECRET);
            const user = await User.findOne({
                where: { passwordResetToken: token },
            });
            if (!user) {
                return res.status(404).json({
                    status: 'failed',
                    message: 'User does not exist',
                });
            }
            const pool = await worker_pool.get_proxy();
            await pool.update_userpassword(token, password);
            return res.status(200).json({
                status: 'success',
                message: 'Password update has been initiated',
            });
        } catch (err) {
            return res.status(500).json({
                status: 'failed',
                message: err.message,
            });
        }
    },

    async getAllUsers(_req, res) {

        try {
            const users = await User.findAll()
            return res.status(201).json({
                status: "success",
                message: `${users.length} Users found`,

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

