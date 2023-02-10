const { User } = require('../models')
const authServices = require('../services/authServices')

exports.signUp = async (req, res) => {
    let data = req.body
    try{
    
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
    catch(err) {
        console.log(err.message)
        return res.status(500).json(err)
    }
}

exports.getAllUsers = async (_req, res) => {

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


exports.signIn = async (req, res) => {
    const data = req.body
    try {
        let payload = await authServices.signIn(data)
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
        console.log(err)


        return res.status(401).json({
            status: 'failed',
            message: "Sorry, Invalid login Parameters 😢🚑",
            data: {
               message: err.message
            }
            })
       }
}

exports.signout = async (_req, res) => {
    res.cookie('jwt','loggedout',{
        expires: new Date(Date.now() + 10 + 1000),
        httpOnly:true
    });
    res.status(200).json({
        status: 'success',
        message: "Bye!"})
}

