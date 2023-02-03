const answersServices = require('../services/answerServices')

exports.createAnswer = async (req, res) => {
    
    try{
        const data = await answersServices.createAnswer(req);
        return res.status(201).json({
          status: 'success',
          message:  "Answer Created",
          data: {
             data
          }
          })
      }catch(err){
       console.log(err.message)
       return res.status(500).json(err)
      }

  
}

exports.vote = async (req, res) => {
    try{
        const data = await answersServices.voteAnswer(req);
        return res.status(201).json({
          status: 'success',
          message: `Vote logged`,
          data: {
             data
          }
          })
      }catch(err){
       console.log(err.message)
       return res.status(500).json({
        status: 'failed',
        message: err,
        })
      }
    
}

exports.getAllAnswers = async (res) => {

    try{
      const data = await answersServices.getAllAnswers();
      return res.status(201).json({
        status: 'success',
        message: `${data.answers.length} Answer(s) found`,
        fromCache: data.isCached,
        data: data.answers
        })
    }catch(err){
     console.log(err.message)
     return res.status(500).json( {
        status: 'failed',
        message: err.message,
        })
    }
 }

exports.getAnswerById = async (req, res) => {
    try{
        
        //uuid
        const data = await answersServices.getAnswerById(req.params.id);
        return res.status(201).json({
            status: 'success',
            message: `Answer found`,
            data: {
            isAi:data.isAi,
            answer: data.answer}
            })
    }catch(err){
            console.log(err.message)
        return res.status(500).json(
            {
                status: 'failed',
                message: err.message,
                }
            )
    }
 }

exports.getAnswerByUserIdandQuestionId = async (req, res) => {
    
    try{
        //uuid
        const data = await answersServices.getAnswerByUserIdandQuestionId(req);
        return res.status(201).json({
            status: 'success',
            message: `${data.length} Answer(s) found`,
            data
            })
    }catch(err){
            console.log(err.message)
        return res.status(500).json(
            {
                status: 'failed',
                message: err.message,
                }
            )
    }
 }