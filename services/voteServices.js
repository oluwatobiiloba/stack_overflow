const { Answers, Voters } = require('../models');


module.exports = {
    getVotes: async function () {
        const votes = Voters.findAll().catch(
            err => {
                throw new Error("No votes available")
            })
        return votes
    },

    getVotesByAnswer: async function (uuid, answer = null, votes = null) {
        if (!answer) { answer = await Answers.findOne({ where: { uuid } }) }
        votes = await Voters.findAll({ where: { answerid: answer.id } })

        // Variables for storing the values of upvotes and downvotes
        let upvotes_array = []
        let downvotes_array = []
        let voters_array = []

        // Looping through the elements of the "votes" array 
        // and extracting the required votes and userIds
        votes.forEach(function (vote) {
            const { upvotes, downvotes, userId } = vote
            upvotes_array.push([upvotes, userId])
            downvotes_array.push([downvotes, userId])
            voters_array.push(userId)
        })

        // Filtering out unnecessary values
        upvotes_array = upvotes_array.filter(function (vote) {
            return vote[0];
        })
        downvotes_array = downvotes_array.filter(function (vote) {
            return vote[0];
        })
        console.log("upvotes_array", upvotes_array)
        console.log("downvotes_array", downvotes_array)

           // Returning the calculated values
        const payload = {
            Upvotes: upvotes_array.length,
            Downvotes: downvotes_array.length,
            Voters: voters_array.length,
            AnswerUuid: answer.uuid,
            Answer: answer.answer,
            Accepted: answer.Accepted,
            Postedby: answer.userId,
            VotersId: voters_array
        }
        return payload
    }

}