'use strict';
const chai = require('chai');
const { Voters, Answers } = require('../../models')

const expect = chai.expect;
const assert = require('assert');
const redisClient = require('../../util/redis_helper')

const answerServices = require('../../services/answerServices')

const answer_id = 1
before(() => {
    //Initialize redis
    const redis_init = async () => {
        redisClient.on('error', err => console.error('Redis Client Error', err))
        await redisClient.connect().then(
            console.log('Redis server connected')
        ).catch(err => {
            console.log('Redis initialization failed:', err)
        })


    }

    redis_init();
})

describe("Test All Answer Functionality", () => {
    it('should create answer', () => {
        const answer_payload = {
            answer: 'Mocha test',
            questionId: 1,
            userId: 1
        }
        console.log(answer_payload)
        return answerServices.createAnswer(answer_payload).then(
            (res) => {
                expect(res).to.be.an("object");
                assert.deepEqual(answer_payload.answer, res.newAnswer.answer)
                assert.deepEqual(answer_payload.questionId, res.newAnswer.questionId)

            }
        )
    })

    it('should get all answers', () => {
        return answerServices.getAllAnswers().then(
            (res) => {
                expect(res).to.be.an("object");
                expect(res.isCached).to.be.a('boolean')
                assert.equal(res.isCached, false || true)
                expect(res.Answers.length).to.be.greaterThanOrEqual(1)
                return answerServices.getAllAnswers()
            }
        ).then((res) => {
            expect(res.isCached).to.be.a('boolean')
            assert.equal(res.isCached, true || false)
        })
    })


    it('should get answer by id', () => {
        return answerServices.getAnswerById(answer_id).then(
            (res) => {
                expect(res).to.be.an("object");
                assert.equal(res.answer.id, 1)
            }
        )
    })

    it('Throws error when userId is not provided', async () => {
        const answer_payload = {
            answer: 'Mocha test',
            questionId: 1,
            userId: 500
        }
        await assert.rejects(answerServices.createAnswer(answer_payload), "Error: User does not exist")
    })

    it('should get answer by user id and question id', () => {
        const answer_payload = {
            user_id: 1,
            question_id: 1
        }

        return answerServices.getAnswerByUserIdandQuestionId(answer_payload).then(
            (res) => {
                expect(res).to.be.an("array");
                assert.equal(res[0].userId, 1);
                assert.equal(res[0].questionId, 1);
            }
        )
    })

    it('should throw an error if question id /userid is not found', async () => {
        const answer_payload = {
            user_id: 1,
            question_id: 500
        }
        await assert.rejects(answerServices.getAnswerByUserIdandQuestionId(answer_payload), "Error: No question with that id")
        answer_payload.user_id = 100
        await assert.rejects(answerServices.getAnswerByUserIdandQuestionId(answer_payload), "Error: No user with that id")
        answer_payload.user_id = 2
        answer_payload.question_id = 30
        await assert.rejects(answerServices.getAnswerByUserIdandQuestionId(answer_payload), "Error: No answer with that question id or made by that user")

    });


    it('should vote an answer', () => {
        const vote_payload = {
            upVote: true,
            answer_id: 1
        }
        const user = {
            id: 1
        }
        answerServices.voteAnswer(vote_payload, user).then(
            (res) => {
                expect(res).to.be.an("array");
                assert.equal(res[0].id, vote_payload.answer_id)
                delete vote_payload.upVote
                vote_payload.downVote = true
                return answerServices.voteAnswer(vote_payload, user)
            }
        ).then(
            (res) => {
                expect(res).to.be.an("array");
                assert.equal(res[0].id, vote_payload.answer_id)
                assert.equal(res[0].downvotes, 2)
                assert.equal(res[0].upvotes, 0)

                user.id = 500
                return answerServices.voteAnswer(vote_payload, user)
            }
        ).then((res) => {
            expect(res).to.be.an("array");
            assert.equal(res[0].id, vote_payload.answer_id)
        }).catch((err) => {
            console.log(err)
        })
    })

    it('should throw an error if user is not provided', async () => {
        const vote_payload = {
            answer_id: 1,
            upVote: false,
            downVote: true
        };

        const user = {};   // no user

        await assert.rejects(answerServices.voteAnswer(vote_payload, user), "Error: User does not exist")
    });

    it('should throw an error for non-existing answer', async () => {
        const vote_payload = {
            answer_id: 500,  // non-existing answer
            upVote: false,
            downVote: true
        };
        const user = { id: 1 };
        await assert.rejects(answerServices.voteAnswer(vote_payload, user), 'Error: No answer with that Id')

    });


    it('should throw an error for no vote', async () => {
        const vote_payload = {
            answer_id: 1,  // non-existing answer
            upVote: false,
            downVote: false
        };
        const user = { id: 1 };
        await assert.rejects(answerServices.voteAnswer(vote_payload, user), 'Error: Invalid Vote')

    });



    it('should throw an error if both upvote and downvote is set to true', async () => {
        const vote_payload = {
            answer_id: 1,
            upVote: true,
            downVote: true
        };
        const user = { id: 1 };
        await assert.rejects(answerServices.voteAnswer(vote_payload, user), "Error: You can only upvote or downvote at a time")

    });



    after(() => {
        Voters.destroy({ where: { userId: 500 } })
        Answers.destroy({ where: { answer: "Mocha test" } })
    })
})