const { sequelize, User, Questions , Answers, Votes } = require('../models')

//Answers Services(logic)

module.exports = {
    getAllAnswers: async function(){
        var fields =   ["user",'question','comments','votes'];
        const answers = await Answers.findAll({include: fields})
            .catch(
                err => {
                    console.log(err.message);
                    throw err
                });

        return answers
    },

    getAnswerById: async function(uuid){
        var fields = ["user",'question','comments','votes']
        const answer = await Answers.findOne({where: {uuid: uuid} , include: fields})
            .catch(
                err => {
                    console.log(err.message);
                    throw err
                });
               
                return answer
    },

    createAnswer: async function(query){
       const { answer,userUuid,questionUuid} = query.body

       console.log(query.body)
       const question = await Questions.findOne({where : {uuid:questionUuid}});
       const user = await User.findOne({where : {uuid:userUuid}});
        
       try{ 
        const newAnswer = await Answers.create({ answer,questionId:question.id,userId:user.id})
        const newVote = await Votes.create({answerId:newAnswer.id, userId : user.id })
        send = {newAnswer,newVote}
        }catch(err){
                console.log(err.message);
                throw err
            }

        return send

    },

    voteAnswer: async function(query){
        const {answerUuid,upVote,downVote} = query.body
        const { id } = query.user
        
        try{
            const answer =  await Answers.findOne({where: { uuid: answerUuid }})
        if(!answer){
            throw new Error("No answer with that Id")};
        const vote = await Votes.findOne({where: {answerId: answer.id,userId:id} });
        console.log(vote)
        if(!vote){
            const voter = await User.findOne({where : {id:id}})
            const newVote = await Votes.create({answerId:answer.id, userId : voter.id })
            return newVote
        };
            if(upVote){
                answer.upvotes += 1;
                vote.upvotes = answer.upvotes;
            } else if(downVote) {
                answer.downvotes += 1;
                vote.downvotes = answer.downvotes;
            }
            cast = await Promise.all([ answer.save(),vote.save()])
            
        }
        catch(err) {
            console.log(err.message)
            throw err
        }

        return cast
    },

    getAnswerByUserIdandQuestionId: async function(query){

        const {userUuid,questionUuid} = query.body

        try{
            const user = await User.findOne({where: {uuid:userUuid}});
            const question = await Questions.findOne({where: {uuid:questionUuid}});
            const answer = await findOne({where: {userId:user.id,questionId:question.id}})

            return answer
        }catch(err){
            console.log(err.message)
            throw err
        }

    }
}
