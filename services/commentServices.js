const {Answers , Questions , User , Comments} = require('../models');
const user = require('../models/user');

module.exports ={
    getAllComments: async function(){
        let fields = ["user","answers"]
      
        const comment = await Comments.findAll({include:fields}).catch(
            err => {
                console.log(err)
            throw new Error('Something went wrong on our end: 😒')
        })
      return comment
    },

    getCommentsByUserId: async function(uuid){
       
        const user = await User.findOne({where: { uuid:uuid } })
        if(!user){
            throw new Error("No user with that Id")}
        
        const comment = await Comments.findAll({where:{userId:user.id}})
        if(comment.length === 0){
            throw new Error("This user has no comments, perhaps they're shy🤓")}
        return comment
    },

    getCommentsByAnswerId: async function(uuid){

        const answer = await Answers.findOne({where: { uuid:uuid }}).catch(
            err => {
                throw err
            }
        )
        if(!answer){
            throw new Error("This answer does not exist 🤔")}

        const comment = await Comments.findAll({where:{answerId:answer.id}}).catch(
            err => {
                throw  new Error("This answer has no comments 🤥")
            }
        )
        return comment
    },

    creatComment: async function(query){
        const { comment,userUuid,answerUuid } = query.body;

        const user = await User.findOne({where: {uuuid:userUuid}}).catch(
            err => {
                throw new Error("No user found")
            }
        )
        if(!user){
            throw new Error("No user with that Id")}

        const answer = await Answers.findOne({where: {uuid:answerUuid}}).catch(
            err => {
                throw new Error("No answers found")
            }
        )
        if(!answer){
            throw new Error("This answer does not exist 🤔")}

        const newComment = await Comments.create({ comment: comment , userId:user.id , answerId:answer.id}).catch(
            err => {
                throw err
            }
        )

        return newComment
    }

}

