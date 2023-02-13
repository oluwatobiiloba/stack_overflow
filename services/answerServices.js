const { sequelize, User, Questions, Answers, Voters } = require('../models');
const redisClient = require('../util/redis_helper');
const voteServices = require('./voteServices');

//Answers Services(logic)

module.exports = {
    async getAllAnswers() {
        let fields = ["user", 'question', 'comments', 'votes'];
        let isCached = false;
        let answers = null;
        let key = 'answers:all';
        let respObj = {};

        await sequelize.transaction(async (t) => {
            let cachedAnswers = await redisClient.get(key);
            if (cachedAnswers) {
                isCached = true;
                answers = JSON.parse(cachedAnswers);
            } else {
                answers = await Answers.findAll({ include: fields }, { transaction: t });
                if (!answers) {
                    throw new Error('No Answers Found')
                }
                await redisClient.setEx(key, 30, JSON.stringify(answers))
            }
            respObj.Answers = answers;
            respObj.isCached = isCached;
        });
        return respObj;
},

    async getAnswerById(uuid) {
        let fields = ["user", 'question', 'comments', 'votes'];
        let resobj = {};

        return sequelize.transaction(async (t) => {
            const answer = await Answers.findOne({
                where: { uuid },
                include: fields,
                transaction: t,
            });
            if (!answer) throw new Error("Answer Not found");
            resobj = {
                answer,
                isAi: false,
            };
            if (answer.userId === 0) {
                resobj.isAi = true;
            }
            return resobj;
        });
    },
    async createAnswer(data) {
        const { answer, userUuid, questionUuid } = data;
        let fields = ["user", 'question', 'comments', 'votes'];
        let newAnswer = {};
        let newVote = {};
        let user = {};

        await sequelize.transaction(async (t) => {
            return Questions.findOne({ where: { uuid: questionUuid } }, { transaction: t })
                .then(async (question) => {
                    user = await User.findOne({ where: { uuid: userUuid } }, { transaction: t });
                    return { user, question };
                })
                .then(async ({ user, question }) => {
                    newAnswer = await Answers.create({ answer, questionId: question.id, userId: user.id }, { transaction: t });
                    newVote = await Voters.create({ answerId: newAnswer.id, userId: user.id }, { transaction: t });
                })
                .then(async () => {
                    let key = 'answers:all';
                    await redisClient.setEx(key, 30, JSON.stringify(await Answers.findAll({ include: fields }, { transaction: t })));
                })
                .catch(err => {
                    throw err;
                });
        });
        return { newAnswer, newVote };
    },

    async voteAnswer(data, user) {
        const { answerUuid, upVote, downVote } = data;
        const { uuid, id } = user;
        let vote = {};
        let cast;

        if (!uuid || !id) {
            throw new Error("User does not exist");
        }

        await sequelize.transaction(async (t) => {
            return Answers.findOne({ where: { uuid: answerUuid } }, { transaction: t })
                .then(
                    async (answer) => {
                        if (!answer) {
                            throw new Error("No answer with that Id");
                        }

                        vote = await Voters.findOne({ where: { answerId: answer.id, userId: id } }, { transaction: t });

                        if (!vote) {
                            vote = await Voters.create({ answerId: answer.id, userId: id }, { transaction: t });
                        }

                        switch (true) {
                            case upVote === true && downVote !== true:
                                vote.upvotes = true;
                                vote.downvotes = false;
                                break;
                            case downVote === true && upVote !== true:
                                vote.downvotes = true;
                                vote.upvotes = false;
                                break;
                            case upVote === true && downVote === true:
                                throw new Error("You can only upvote or downvote at a time");
                            default:
                                vote.upvotes = false;
                                vote.downvotes = false;
                                break;
                        }

                        let savedVote = await vote.save({ transaction: t });
                        return [answer, savedVote];
                    })
                .catch((err) => {
                    throw err.message;
                });
        }).then(async ([answer, vote]) => {
            let votecalc = await voteServices.getVotesByAnswer(answerUuid, answer);
            answer.upvotes = votecalc.Upvotes;
            answer.downvotes = votecalc.Downvotes;
            savedAnswer = await answer.save();
            cast = [savedAnswer, vote];
        }).catch(
            (err) => {
                throw err.message;
            }
        );
        return cast;

    },

    async getAnswerByUserIdandQuestionId(data) {
        const { user_id, question_id } = data

        let question = {}
        let answer = {}
        let resp = []
        await sequelize.transaction(async (t) => {

            return User.findOne({ where: { id: user_id } }, { transaction: t })
        .then(
            async (user)=>{
                if(!user){
                    throw new Error('No user with that id')
                   }
                question = await Questions.findOne({ where: { id: question_id } }, { transaction: t })
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
                
                throw err
            })
        })
    return resp     
}
}
