const { sequelize, User, Roles} = require('../models')
const bcrypt = require('bcryptjs')
const authServices = require('../services/authServices')


const createSendToken =(user, statusCode, res) => {

    const payload = authServices.createSendToken(user)
    
    user.password = undefined
    res.cookie('jwt', payload.token, payload.cookieOptions)
    res.status(statusCode).json({
        status: 'success',
        payload,
        data: {
            user
        }
    });
}

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
        console.log('here')
           userLogged = await authServices.signIn(req) 
            return res.status(201).json({
                status: "success",
                message: `Logged in Succesfully`,
                data:{
                    
                }
            })
       }catch(err){
        console.log(err)
        return res.status(500).json(err)
       }
}