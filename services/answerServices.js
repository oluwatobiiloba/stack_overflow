const { sequelize, User, Questions , Answers, Voters } = require('../models');
const util = require('util')
const redis = require('redis')
const redisClient = require('../util/redis_helper');
//Answers Services(logic)

module.exports = {
    getAllAnswers: async function(){
        let fields =   ["user",'question','comments','votes'];
        let isCached = false;
        let answers;
        let cachedAnswers;
        let key = 'answers:all'
        
        await sequelize.transaction(async (t) => { 
        
        await redisClient.get(key)
        .then(
           async cachedAnswers =>{
                if(cachedAnswers){
                    isCached = true;
                    answers = JSON.parse(cachedAnswers);
                } else {
                    answers = await Answers.findAll({include: fields}, { transaction: t });
                    if(!answers){
                        throw new Error('No Answers Found')
                    }
                    await redisClient.setEx(key, 30 ,JSON.stringify(answers))
                }
            }
        ).catch(
            err => {
                console.log(err.message);
                throw err
            });
        
      
    }
    )
    return {answers,isCached}
},

    getAnswerById: async function(uuid){
        let fields = ["user",'question','comments','votes']
        let resobj = {}
        let answer = {}

        await sequelize.transaction(async(t) => {

        answer = await Answers.findOne({where: {uuid: uuid} , include: fields}, { transaction: t })
        .then( (answer) => {
            if(!answer){
                throw new Error('Answer Not found')
            }
            resobj = {
                answer,
                isAi: false
            }
            if(answer.userId === 0 ){
                resobj.isAi = true
            }})
        .catch(
            err => {
                throw err
            })
    })
               return resobj
    },

    createAnswer: async function(query){
       const { answer,userUuid,questionUuid} = query.body
       let fields =   ["user",'question','comments','votes'];
       let newAnswer = {}
       let newVote = {}
       let user = {}
       let question = {}

        const result = await sequelize.transaction(async (t) => {
            question = await Questions.findOne({where : {uuid:questionUuid}},{ transaction: t })
            .then(async(question) => {
                user = await User.findOne({where : {uuid:userUuid}},{ transaction: t });
                return {user,question}
            })
            .then(async({user,question}) => {
                newAnswer = await Answers.create({ answer,questionId:question.id,userId:user.id},{ transaction: t })
                newVote = await Voters.create({answerId:newAnswer.id, userId : user.id },{ transaction: t })})
            .then(async()=>{
                await Answers.findAll({include: fields},{ transaction: t })
            .then( async (update) => {
                let key = 'answers:all'
                await redisClient.setEx(key, 30 ,JSON.stringify(update))
                    })})
            .catch(
                err => {
                    console.log(err.message);
                    throw err
                });
        })
       return {newAnswer,newVote}

    },

    voteAnswer: async function(query){
        const {answerUuid,upVote,downVote} = query.body
        const { id } = query.user

        try{
            await sequelize.transaction(async (t) => {
                const answer =  await Answers.findOne({where: { uuid: answerUuid }},{ transaction: t })
        if(!answer){throw new Error("No answer with that Id")};

        let vote = await Voters.findOne({where: {answerId: answer.id,userId:id} }, { transaction: t });
        if(!vote){
            const voter = await User.findOne({where : {id:id}}, { transaction: t })
            const newVote = await Voters.create({answerId:answer.id, userId : voter.id }, { transaction: t })
            vote = newVote
        }
        
        if(!(vote.upvotes === false && vote.downvotes === false)){
            if(upVote === true && vote.downvotes === true){
                vote.upvotes = true;
                vote.downvotes= false
            }else if(downVote === true && vote.upvotes === true){
                vote.upvotes = false;
                vote.downvotes= true
            }else if((downVote === false && vote.upvotes === false) || ( upVote === false && vote.downVote === false)){
                vote.downvotes = false
                vote.upVote = false
            }
            else {
                throw new Error("You've already place this vote")
            }
        }else if((vote.upvotes === false && vote.downvotes === false)){
            if(upVote){vote.upvotes = true;
               }else if(downVote) {
                answer.downvotes += 1;
                vote.downvotes = true;
        }else{
            throw new Error("You've already placed this vote")
        };
        }
        cast = await Promise.all([ answer.save({ transaction: t }),vote.save({ transaction: t })])}) 
    }catch(err) {
            console.log(err.message)
            throw err.message
        }

        return cast
    },

    getAnswerByUserIdandQuestionId: async function(query){
        const {userUuid,questionUuid} = query.body

        let question = {}
        let answer = {}
        let resp = []
        await sequelize.transaction(async (t) => {

            await User.findOne({where: {uuid:userUuid}}, { transaction: t })
        .then(
            async (user)=>{
                if(!user){
                    throw new Error('No user with that id')
                   }
               question = await Questions.findOne({where: {uuid:questionUuid}}, { transaction: t })
               if(!question){
                throw new Error('No question with that id')
               }
                return {user,question}
            }
        ).then(
            async({user,question})=>{
              answer =  await Answers.findAll({where: {userId:user.id,questionId:question.id}}, { transaction: t })
              if(!answer){
                throw new Error('No answer with that question id or made by that user')
               }
               answer.map(
                ans => {
                    let isAi = false
                    if(ans.userId === 0 ){
                      isAi = true
                    }
                    resp.push(
                        {
                            id: ans.id,
                            isAi: isAi,
                            uuid: ans.uuid,
                            answer: ans.answer,
                            downvotes: ans.downvotes,
                            upvotes: ans.upvotes,
                            accepted: ans.accepted,
                            userId: ans.userId,
                            questionId: ans.questionId,
                            createdAt: ans.createdAt,
                            updatedAt: ans.updatedAt
                        }
                    )
                }
               )
            }
        ).catch(
            err => {
                console.log(err.message);
                throw err
            })
        })
    return resp     
}
}
