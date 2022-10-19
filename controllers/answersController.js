const { sequelize, User, Questions , Answers, Votes } = require('../models')


exports.createAnswer = async (req,res,next)=>{
    const {answer,userUuid,questionUuid} = req.body
    const question = await Questions.findOne({where: { uuid: questionUuid }});
    const user = await User.findOne({where: { uuid: userUuid }});

    console.log(req.body);
    try {
       
        const newAnswer = await Answers.create({ answer,questionId:question.id,userId:user.id});
        const newVote = await Votes.create({answerId:newAnswer.id, userId : user.id })
    return res.status(201).json({
        status: 'success',
        message: "Answer Posted",
        data: {
            newAnswer,
            newVote
        }
        })
    }
    catch(err) {
        console.log(err)
        return res.status(500).json(err)
    }
}

exports.vote = async (req,res,next)=>{
    const {answerUuid,userUuid,upVote,downVote} = req.body

    const answer =  await Answers.findOne({where: { uuid: answerUuid }});
    
    try {
        if(upVote){
            answer.upvotes += 1
        } else if(downVote) {
            answer.downvotes += 1
        }
        await answer.save()

        return res.status(201).json({
            status: 'success',
            message: "vote Posted",
            data: {
               answer
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
     
     const answers = await Answers.findAll({include: ["user",'question','comments','votes']})
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