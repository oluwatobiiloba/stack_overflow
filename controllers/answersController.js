const { sequelize, User, Questions , Answers, Votes } = require('../models')
const answersServices = require('../services/answerServices')
const { promisify } = require('util');
const jwt = require('jsonwebtoken')

exports.createAnswer = async (req,res,next)=>{
    
    try{
        const data = await answersServices.createAnswer(req);
        return res.status(201).json({
          status: 'success',
          message: `${data.length} Answer(s) Created`,
          data: {
             data
          }
          })
      }catch(err){
       console.log(err.message)
       return res.status(500).json(err)
      }

  
}

exports.vote = async (req,res,next)=>{
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
       return res.status(500).json(err)
      }

    // const {answerUuid,userUuid,upVote,downVote} = req.body

    // const answer =  await Answers.findOne({where: { uuid: answerUuid }});
    // const vote = await Votes.findOne({where: {answerId: answer.id }});

    
    // try {
    //     if(upVote){
    //         answer.upvotes += 1;
    //         vote.upvotes = answer.upvotes;
    //     } else if(downVote) {
    //         answer.downvotes += 1;
    //         vote.downvotes = answer.downvotes;
    //     }
    //     const save = [ answer.save(),vote.save()]
    //    cast = await Promise.all(save)

    //     return res.status(201).json({
    //         status: 'success',
    //         message: "vote Posted",
    //         data: {
    //            cast
    //         }
    //         })
    // }
    // catch(err) {
    //     console.log(err.message)
    //     return res.status(500).json(err)
    // }
}

exports.getAllAnswers = async (req,res,next) => {

    try{
      const data = await answersServices.getAllAnswers();
      return res.status(201).json({
        status: 'success',
        message: `${data.length} Answer(s) found`,
        data: {
           data
        }
        })
    }catch(err){
     console.log(err.message)
     return res.status(500).json(err)
    }
 }

 exports.getAnswerById = async (req,res,next) => {
    try{

        //uuid
        const data = await answersServices.getAnswerById(req.params.id);
        if(!data){
            return res.status(404).json({
                status: 'failed',
                message: "Sorry, no answer with that id 👀😬",
                })
        }
        return res.status(201).json({
            status: 'success',
            message: `Answer found`,
            data: {
               data
            }
            })
    }catch(err){
            console.log(err.message)
        return res.status(500).json(err)
    }
 }