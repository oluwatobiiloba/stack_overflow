const { Answers, Voters } = require('../models');


module.exports = {
    async getVotes() {
        const votes = Voters.findAll()
        if (!votes) {
            throw new Error('No Votes Found')
        }
        return votes
    },

    async getVotesByAnswer(uuid, answer = null, votes = null) {
        if(!answer){ answer = await Answers.findOne({where: {uuid}})}
        if (!votes) { votes = await Voters.findAll({ where: { answerid: answer.id } }) }
        let upvotes = votes.filter(vote => vote.upvotes).map(vote => [vote.upvotes, vote.userId]);
        let downvotes = votes.filter(vote => vote.downvotes).map(vote => [vote.downvotes, vote.userId]);
        let voters = votes.map(vote => vote.userId);

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