const { sequelize, User, Questions , Answers } = require('../models')


exports.createAnswer = async (req,res,next)=>{
    const {answer,userUuid,questionUuid} = req.body
    const question = await Questions.findOne({where: { uuid: questionUuid }});
    const user = await User.findOne({where: { uuid: userUuid }});

    console.log(req.body);
    try {
       
        const newAnswer = await Answers.create({
            answer,questionId:question.id,userId:user.id});
        
    return res.status(201).json({
        status: 'success',
        message: "Answer Posted",
        data: {
            newAnswer, 
        }
        })
    }
    catch(err) {
        console.log(err)
        return res.status(500).json(err)
    }
}

exports.getAllAnswers = async (req,res,next) => {

    try{
     
     const answers = await Answers.findAll({include: ["user",'question']})
         return res.status(201).json({
             status: "success",
             message: `${answers.length} answers found`,
             data:{
                 answers
             }
         })
    }catch(err){
     console.log(err)
     return res.status(500).json(err)
    }
 }