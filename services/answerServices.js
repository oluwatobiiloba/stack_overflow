const { sequelize, User, Questions, Answers, Voters } = require('../models');
const redisClient = require('../util/redis_helper');
const voteServices = require('./voteServices');

//Answers Services(logic)

module.exports = {
    async getAllAnswers() {
        let fields = ["user", 'question', 'comments', 'votes'];
        let isCached = false;
        let answers = null;
        const key = 'answers:all';
        const respObj = {};

        await sequelize.transaction(async (t) => {
            const cachedAnswers = await redisClient.get(key);
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

    getAnswerById(uuid) {
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

        const { answer, userId, questionId } = data;
        const fields = ["user", 'question', 'comments', 'votes'];
        let newAnswer = {};
        let newVote = {};
        let user = {};

        return sequelize.transaction(async (t) => {
            return Questions.findOne({ where: { id: questionId } }, { transaction: t })
                .then(async (question) => {
                    user = await User.findOne({ where: { id: userId } }, { transaction: t });
                    return { user, question };
                })
                .then(async ({ user, question }) => {

                    newAnswer = await Answers.create({ answer, questionId: question.id, userId: user.id }, { transaction: t });
                    newVote = await Voters.create({ answerId: newAnswer.id, userId: user.id }, { transaction: t });
                    return { newAnswer, newVote };
                })
                .then(async (resp) => {
                    const key = 'answers:all';
                    await redisClient.setEx(key, 30, JSON.stringify(await Answers.findAll({ include: fields }, { transaction: t })));
                    return resp
                })
                .catch(err => {
                    console.log(err)
                    throw err;
                });
        });

    },

    async voteAnswer(data, user) {
        const { answer_id, upVote, downVote } = data;
        const { uuid, id } = user;
        let vote = {};
        let cast = {};

        if (!uuid || !id) {
            throw new Error("User does not exist");
        }

        return sequelize.transaction(async (t) => {
            return Answers.findOne({ where: { id: answer_id } }, { transaction: t })
                .then(
                    async (answer) => {
                        if (!answer) {
                            throw new Error("No answer with that Id");
                        }

                        let vote_obj = await Voters.findOne({ where: { answerId: answer.id, userId: id } }, { transaction: t });

                        if (!vote_obj) {
                            vote_obj = await Voters.create({ answerId: answer.id, userId: id }, { transaction: t });
                        }

                        vote = vote_obj
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

                        const savedVote = await vote.save({ transaction: t });
                        return [answer, savedVote];
                    })
                .catch((err) => {
                    throw err.message;
                });
        }).then(async ([answer, vote]) => {
            const votecalc = await voteServices.getVotesByAnswer(answer_id, answer);
            answer.upvotes = votecalc.Upvotes;
            answer.downvotes = votecalc.Downvotes;
            let savedAnswer = await answer.save();
            cast = [savedAnswer, vote];
            return cast
        }).catch(
            (err) => {
                throw err.message;
            }
        );

    },

    async getAnswerByUserIdandQuestionId(data) {
        const { user_id, question_id } = data

        let resp = []
        return sequelize.transaction(async (t) => {

            return User.findOne({ where: { id: user_id } }, { transaction: t })
        .then(
            async (user)=>{
                if(!user){
                    throw new Error('No user with that id')
                   }
                let question = await Questions.findOne({ where: { id: question_id } }, { transaction: t })
               if(!question){
                throw new Error('No question with that id')
               }
                return {user,question}
            }
        ).then(
            async({user,question})=>{
                let answer = await Answers.findAll({ where: { userId: user.id, questionId: question.id } }, { transaction: t })
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
                return resp
            }
        ).catch(
            err => {
                
                throw err
            })
        })
}
}
