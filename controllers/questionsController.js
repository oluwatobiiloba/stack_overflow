const { sequelize, User, Questions , } = require('../models')
const questionServices = require('../services/questionServices')

exports.createQuestion = async (req,res,next)=>{
    const {question,userUuid} = req.body
    
    console.log(req.body);
    try {
       const data = await questionServices.createQuestion(req)
       return res.status(201).json({
        status: "Successful",
        message: `Question posted successfully`,
        data:{
            data
        }
       })
    }
    catch(err) {
        console.log(err.message)
        return res.status(500).json({
            status: 'failed',
            message: "Sorry, error occured processing your request 😢🚑",
            data: {
               message: err.message
            }
            })
    }
}

exports.getAllQuestions = async (req,res,next) => {

    try{
     const questions = await questionServices.getAllQuestions();
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

 exports.getQuestionById = async (req,res,next) => {
    try{
        const data = await questionServices.getQuestionById(req.params.id);
        if(!data){
            return res.status(404).json({
                status: 'failed',
                message: "Sorry, no question with that id 👀😬",
                })
        }
        return res.status(201).json({
            status: 'success',
            message: `Question found`,
            data: {
               data
            }
            })
    }catch(err){
        console.log(err.message)
        return res.status(500).json({
            message: err.message
        })
    }
 }

 exports.getQuestionByUserId = async (req,res,next) => {
    try{
        const data = await questionServices.getQuestionsByUser(req.params.id)
        if(!data){
            return res.status(404).json({
                status: 'failed',
                message: "Sorry, this user apparently doesn't need help. No questions asked! 👀😬",
                })
        }
        return res.status(201).json({
            status: 'success',
            message: `${data.user.username} has posted ${data.question.length} Questions found 🙋🏽‍♂️🙋‍♀️`,
            data: {
               data
            }
            })
    }catch(err){
        console.log(err.message)
        return res.status(500).json({
            message: err.message
        })
    }
 }

