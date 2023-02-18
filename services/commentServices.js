const { Answers, Comments } = require('../models');
const logger = require('../util/logger');

module.exports ={
    async getAllComments(){
        let fields = ["user","answers"]
      
        const comment = await Comments.findAll({include:fields}).catch(
            err => {
                logger.error(err);  
            throw new Error('Something went wrong on our end: 😒')
        })
      return comment
    },

    async getCommentsByUserId(id) {
        const comment = await Comments.findAll({ where: { userId: id } }).catch(err => logger.error(err))
        if(comment.length === 0){
            throw new Error("This user has no comments, perhaps they're shy🤓")}
        return comment
    },

    async getCommentsByAnswerId(id) {
        try {
            const answer = await Answers.findOne({ where: { id } })
            if (!answer) {
                throw new Error("This answer does not exist 🤔")
            }

            const comment = await Comments.findAll({ where: { answerId: id } })
            if (comment.length < 1) {
                throw new Error("This answer has no comments 🤥")
            }

            return comment

        } catch (err) {
            logger.error(err);
            throw err;
        }
    },


    async creatComment(payload) {
        const { comment, answerId, userId } = payload;

        const answer = await Answers.findOne({ where: { id: answerId } })
        if(!answer){
            throw new Error("This answer does not exist 🤔")}

        const newComment = await Comments.create({ comment: comment, userId: userId, answerId: answer.id })

        return newComment
    }

}

