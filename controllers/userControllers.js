const { sequelize, User } = require('../models')


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
        role})
    
    return res.status(201).json({
        status: 'success',
        message: "User registered",
        data: {
            newUser
        }
        })
    }
    catch(err) {
        console.log(err)
        return res.status(500).json(err)
    }
}