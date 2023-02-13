
const voteServices = require('../services/voteServices')

module.exports = {
    async getAllVotes(_req, res, _next) {

        try {

            const votes = await voteServices.getVotes()
            return res.status(201).json({
                status: "success",
                message: `${votes.length} votes found`,
                data: {
                    votes
                }
            })
        } catch (err) {
            console.log(err)
            return res.status(401).json({
                status: 'failed',
                message: "Unable to fetch data",
                data: {
                    message: err.message
                }
            })
        }
    },

    async getVotesByAnswerId(req, res) {
        try {
            const payload = await voteServices.getVotesByAnswer(req.params.id)

            return res.status(201).json({
                status: "success",
                message: ` votes found`,
                data: {
                    payload
                }
            })

        } catch (err) {
            console.log(err)
            return res.status(401).json({
                status: 'failed',
                message: "Could not retrieve any data",
                data: {
                    message: err.message
                }
            })
        }
    }
}
