const { Answers, Voters } = require('../models');


module.exports = {
    getVotes: async function(){
        const votes = Voters.findAll().catch(
            err => {
                throw new Error("No votes available")
            })
        return votes
    },

    getVotesByAnswer: async function(uuid, answer = null, votes = null ){
        if(!answer){ answer = await Answers.findOne({where: {uuid}})}
        votes = await Voters.findAll({where: {answerid:answer.id}})
        // const {upvotes , downvotes} = votes
        // console.log(votes[2].dataValues)
        // console.log(upvotes)
        let upvotes = []
        let downvotes = []
        let voters = []
        votes.forEach(function(vote){
            upvotes.push([vote.dataValues.upvotes,vote.dataValues.userId])
            downvotes.push([vote.dataValues.downvotes,vote.dataValues.userId])
            voters.push(vote.dataValues.userId)
        })
        upvotes = upvotes.filter(function(vote){
            return vote[0] ;
        })
        downvotes = downvotes.filter(function(vote){
            return vote[0];
        })
       
        const payload = {
            Upvotes:upvotes.length,
            Downvotes: downvotes.length,
            Voters: voters.length,
            AnswerUuid: answer.uuid,
            Answer: answer.answer,
            Accepted: answer.Accepted,
            Postedby: answer.userId,
            VotersId: voters
        }
        return payload
    }
}