const { sequelize, User, Roles} = require('../models')
const bcrypt = require('bcryptjs')
const authServices = require('../services/authServices')
const { promisify } = require('util');
const jwt = require('jsonwebtoken');
// const createSendToken =(user, statusCode, res) => {

//     const payload = authServices.createSendToken(user)
//     console.log(payload.token)
//     user.password = undefined
//     res.cookie('jwt', payload.token, payload.cookieOptions)
//     res.status(statusCode).json({
//         status: 'success',
//         payload,
//         data: {
//             user
//         }
//     });
// }

exports.signUp = async (req,res,next)=>{
    const {username ,first_name,last_name,phonenumber,email,password,role} = req.body
    
    try{
    
        const newUser = await authServices.registerUser(req) 
        //const token = createSendToken(newUser.newUser,201,res)
        return res.status(201).json({
        status: 'success',
        message: "User registered",
        data: {
            newUser,
            
        }
        })
    }
    catch(err) {
        console.log(err.message)
        return res.status(500).json(err)
    }
}

exports.getAllUsers = async (req,res,next) => {

   try{
    const users = await User.findAll({include: ['questions']})
        return res.status(201).json({
            status: "success",
            message: `${users.length} Users found`,
            data:{
                users
            }
        })
   }catch(err){
    console.log(err)
    return res.status(500).json(err)
   }
}

exports.signIn = async (req,res,next) => {
    try{
        let payload = await authServices.signIn(req)
        
        const { token, cookieOptions } = payload.respObj.sendToken
        let user = payload.respObj
        res.cookie('jwt', token, cookieOptions)
            return res.status(201).json({
                status: "success",
                message: `Logged in Succesfully`,
                token,
                data:{
                    user
                }
            })
       }catch(err){

        return res.status(401).json({
            status: 'failed',
            message: "Sorry, Invalid login Parameters 😢🚑",
            data: {
               message: err.message
            }
            })
       }
}

exports.signout = async(req,res,next) => {
    res.cookie('jwt','loggedout',{
        expires: new Date(Date.now() + 10 + 1000),
        httpOnly:true
    });
    res.status(200).json({
        status: 'success',
        message: "Bye!"})
}

exports.protect = async(req,res,next) => {
    try{req.user = await authServices.protect(req)
    }catch(err){
        console.log(err)
        return res.status(401).json({
            status: 'failed',
            message: "Sorry, You need to be logged in",
            data: {
               message: err.message
            }
            })
    }
    next()
}


