const { sequelize, User, Questions , Answers, Comments } = require('../models')


exports.createComment = async (req,res,next)=>{
    const {comment,userUuid,answerUuid} = req.body
    const answer = await Answers.findOne({where: { uuid: answerUuid }});
    const user = await User.findOne({where: { uuid: userUuid }});
    //console.log(user,answer)

    try {
       
        const newComment = await Comments.create({ comment,answerId:answer.id,userId:user.id});
        
    return res.status(201).json({
        status: 'success',
        message: "Comment Posted 🙂",
        data: {
            newComment, 
        }
        })
    }
    catch(err) {
        console.log(err.message)
        return res.status(500).json(err)
    }
}

exports.getAllComments = async (req,res,next) => {
    try{
     const comments = await Comments.findAll({include: ["user",'answers']})
         return res.status(201).json({
             status: "success",
             message: `${comments.length} comments found`,
             data:{
                 comments
             }
         })
    }catch(err){
     console.log(err.message)
     return res.status(500).json(err)
    }
 }