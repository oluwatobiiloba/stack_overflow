const { Users , Answers ,Votes } = require('../models');


module.exports = {
    getVotes: async function(){
        const votes = Votes.findAll().catch(
            err => {
                throw new Error("No votes available")
            })
        return votes
    }
}