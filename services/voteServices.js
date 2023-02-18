const { Answers, Voters } = require('../models');


module.exports = {
    getVotes() {
        return Voters.findAll().then((votes) => {
            if (votes.length < 1) {
                throw new Error("No votes available")
            }
            return votes
        }).catch(
            err => {
                console.log(err)

            })

    },

    async getVotesByAnswer(id, answer = null, votes = null) {
        if (!answer) { answer = await Answers.findOne({ where: { id } }) }
        votes = await Voters.findAll({ where: { answerid: answer.id } })

        // Variables for storing the values of upvotes and downvotes
        let upvotes_array = []
        let downvotes_array = []
        const voters_array = []

        // Looping through the elements of the "votes" array 
        // and extracting the required votes and userIds
        votes.forEach((vote) => {
            const { upvotes, downvotes, userId } = vote
            upvotes_array.push([upvotes, userId])
            downvotes_array.push([downvotes, userId])
            voters_array.push(userId)
        })

        // Filtering out unnecessary values
        upvotes_array = upvotes_array.filter(vote =>
            vote[0]
        )
        downvotes_array = downvotes_array.filter(vote =>
            vote[0]
        )

           // Returning the calculated values
        const payload = {
            Upvotes: upvotes_array.length,
            Downvotes: downvotes_array.length,
            Voters: upvotes_array.length + downvotes_array.length,
            AnswerUuid: answer.uuid,
            Answer: answer.answer,
            Accepted: answer.Accepted,
            Postedby: answer.userId,
            VotersId: voters_array
        }
        return payload
    }

}