const { User, Answers, Votes} = require("../models");
const votes = require("../models/votes");
const voteServices = require('../services/voteServices')

// exports.vote = async (req,res,next)=>{
//     const {answerUuid,userUuid,upVote,downVote} = req.body
//     //const answer = await Answers.findOne({where: { uuid: answerUuid }});
//     //const user = await User.findOne({where: { uuid: userUuid }});
//     const vote = await Votes.findOne({where: {answerId: 3}});
//     const answer =  await Answers.findOne({where: { uuid: answerUuid }});
    
//     try {
//         if(upVote){
//             vote.upvotes += 1
//         } else if(downVote) {
//             vote.downvotes += 1
//         }
//         await vote.save()

//         return res.status(201).json({
//             status: 'success',
//             message: "vote Posted",
//             data: {
//                vote
//             }
//             })
//     }
//     catch(err) {
//         console.log(err)
//         return res.status(500).json(err)
//     }
// }

// exports.vote = async (req,res,next) => {
//     const {answerUuid,userUuid, upVote , downVote} = req.body
    
//     const answer = await Answers.findOne({where: { uuid: answerUuid }});
//     const vote = await Votes.findOne({where: {answerId:answer.id} });
//     const user = await User.findOne({where: { uuid: userUuid }});
    
//     console.log(answer)
//     try{
//         const answer = await Answers.findOne({where: { uuid: answerUuid }});
//         const vote = await Votes.findOne({where: {answerId:answer.id} });
//         const user = await User.findOne({where: { uuid: userUuid }});

//     return   res.status(201).json({
//             status: "success",
//             message: `vote added successfully`,
//             data:{
//                 answer,
//                 vote,
//                 user
//             }
//         })  
//     }catch(err){
//         console.log(err)
//         return res.status(500).json(err)
//     }
// }


exports.getAllVotes = async (req,res,next) => {

    try{
     
     const votes = await voteServices.getVotes()
         return res.status(201).json({
             status: "success",
             message: `${votes.length} votes found`,
             data:{
                 votes
             }
         })
    }catch(err){
     console.log(err)
     return res.status(500).json(err)
    }
 }

 exports.getVotesByAnswerId = async (req,res) => {
    try{
        const payload = await voteServices.getVotesByAnswer(req.params.id)

        return res.status(201).json({
            status: "success",
            message: ` votes found`,
            data:{
                payload
            }
        })
       

    }catch(err){

    }
 }