const { sequelize, User, Questions , } = require('../models')


exports.createQuestion = async (req,res,next)=>{
    const {question,userUuid} = req.body
    
    console.log(req.body);
    try {
        const user = await User.findOne({where: { uuid: userUuid }})
        const newQuestion = await Questions.create({
            question,userId:user.id});
        
    return res.status(201).json({
        status: 'success',
        message: "Question logged 🙂",
        data: {
            newQuestion, 
        }
        })
    }
    catch(err) {
        console.log(err.message)
        return res.status(500).json(err)
    }
}

exports.getAllQuestions = async (req,res,next) => {

    try{
     
     const questions = await Questions.findAll({include: ['user']})
         return res.status(201).json({
             status: "success",
             message: `${questions.length} questions found`,
             data:{
                 questions
             }
         })
    }catch(err){
     console.log(err)
     return res.status(500).json(err)
    }
 }