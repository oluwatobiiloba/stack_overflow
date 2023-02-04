const questionServices = require('../services/questionServices')

exports.createQuestion = async (req, res) => {
    let payload = req.body;
    try {
        const data = await questionServices.createQuestion(payload)
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

exports.getAllQuestions = async (_req, res) => {

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

exports.getQuestionById = async (req, res) => {
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

exports.getQuestionByUserId = async (req, res) => {
    try{
        const data = await questionServices.getQuestionsByUser(req.params.id)
        if (!data.questions) {
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

exports.askAI = async (req, res) => {
    let payload = req.body
    
    try {
        let data = await questionServices.askAI(payload)
        return res.status(201).json({
        status: "Successful",
        message: `Question asked and answered successfully`,
        data:{
            AI_status: data.ai_status,
            AI_Answer: data.ai_answer,
            Question: data.askQuestion

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

