const { User, verify_user, sequelize } = require('../models')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('../config/config')[process.env.NODE_ENV || 'development'];
const worker_pool = require('../worker-pool/init')
const sendEmail = require('../util/mailer')
const upload = require("../util/multer_upload")


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
        }).then(async (user) => {
            const token = this.signToken(user.id)
            const verification_token = this.signToken(user.email)
            await verify_user.create({ user_id: user.id, verification_token, email: user.email, Name: user.username })
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
            const constants = {
                username: user.username,
                verification_link: `${config.LIVE_URL}/api/v1/users/verify-email?token=${verification_token}`
            }
            const mailOptions = {
                email: user.email,
                subject: 'Welcome to Stacklite!',
                constants,
                template_id: "Test Welcome"
            }
            const pool = await worker_pool.get_proxy();
            pool.sendMail(mailOptions)
            respObj.token = token
            return { respObj };
        }).catch((err) => {
            throw err
        })
    },
    verifyEmail(token) {
        let verification_id = null
        return sequelize.transaction((t) => {
            return verify_user.findOne({ where: { verification_token: token } }, { transaction: t })
                .then((verification) => {
                    if (!verification) {
                        throw new Error('Invalid or expired verification link')
                    }
                    jwt.verify(token, config.JWT_SECRET)
                    verification_id = verification.id
                    return User.findOne({ where: { id: verification.user_id } })
                }).then((user) => {
                    if (!user) {
                        throw new Error('User not found')
                    }
                    return [User.update({ is_verified: true }, { where: { id: user.id } }), verify_user.update({ verification_token: null, verification_timestamp: Date.now() }, { where: { id: verification_id } })]
                }).then(() => {
                    return { message: 'Email verified successfully' }
                }).catch((err) => {
                    console.log(err)
                    throw err
                })
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

        respObj.sendToken = sendToken

        payload = { respObj }
        return payload
    },
    forgotPasswordEmail(data) {
        const { username, email } = data
        return User.findOne({ where: { email, username } })
            .then(async (user) => {
                const reset_token = this.signToken(user.email)
                await User.update({ passwordResetToken: reset_token }, { where: { id: user.id } })
                const constants = {
                    username: user.username,
                    reset_link: `${config.LIVE_URL}/api/v1/users/reset-password?token=${reset_token}`
                }
                const mailOptions = {
                    email: user.email,
                    subject: 'You requested a password reset',
                    constants,
                    template_id: "Reset Password"
                }
                const pool = await worker_pool.get_proxy();
                pool.sendMail(mailOptions)

                return { message: 'Password Reset Link Sent to email attached to this account.' };
            }).catch((err) => {
                throw err
            })
    }
    ,
    async resetPassword(user, password) {
        await User.update({ passwordResetToken: null, password }, { where: { id: user.id } })
        const constants = {
                    username: user.username
                }
        const mailOptions = {
                    email: user.email,
                    subject: 'Password Reset Successfully',
                    constants,
                    template_id: "Successful Password Reset"
                }
        const pool = await worker_pool.get_proxy();
                if (pool === null) {
                    sendEmail(mailOptions)
                        .then((res) => {
                            console.log(`Email sent: ${res.response}`)
                        })
                        .catch((err) => { console.log(err) })
                } else {
                    pool.sendMail(mailOptions)
                }

        return { message: 'Password Reset Successfully' };

    }
    ,

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
    },


    async upload_image(data) {
        const payload = {
            originalname: data.file.originalname,
            name: data.file.originalname,
            user_id: data.user.id,
            username: data.user.username,
            file: data.file
        }
        try {
            const uploaded_res = await upload.upload(payload)
            return uploaded_res
        }
        catch (err) {
            console.log(err)
            return err

        }

    },
}


