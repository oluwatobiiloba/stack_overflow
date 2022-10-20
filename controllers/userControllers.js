const { sequelize, User, Roles} = require('../models')


exports.signUp = async (req,res,next)=>{
    const {username ,first_name,last_name,phonenumber,email,password,role} = req.body
    
    console.log(req.body);
    try {
        const newUser = await User.create({
        username ,
        first_name,
        last_name,
        phonenumber,
        email,
        password,
        role});
        
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