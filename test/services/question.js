'use strict';
const chai = require('chai');
const expect = chai.expect;
const assert = require('assert');
const questionServices = require('../../services/questionServices')
const aiClient = require('../../util/ai_helper')

const question_id = 1

before(async () => {
    //Initialize redis
    const ai_init = async () => {

        const response = await aiClient.listEngines()
        if (response.status === 200) {
            console.log('AI engine is up and running!! 🤖🤖🤖🤖')
        } else {
            console.log('Unable to run AI 💥')
        }
    }
    await ai_init();
})

describe("Test Question Services", () => {
    it('should get all answers', () => {
        return questionServices.getAllQuestions().then(
            (res) => {
                expect(res).to.be.an("array");
                expect(res.length).to.be.greaterThanOrEqual(1)
            }
        ).catch(err => {
            console.log(err)
        })
    })


    it('should get question by user id ', () => {
        const user_id = 1
        return questionServices.getQuestionsByUser(user_id).then(
            (res) => {
                expect(res).to.be.an("array");
                assert.equal(res[0].userId, 1);
            }
        )
    })

    it('should get question by id', () => {
        return questionServices.getQuestionById(question_id).then(
            (res) => {
                expect(res).to.be.an("object");
                assert.equal(res.id, 1)
            }
        )
    })



    it('should create Question', () => {
        const question_payload = {
            question: 'Mocha test',
            user: {
                id: 1
            }
        }

        return questionServices.createQuestion(question_payload).then(
            (res) => {
                expect(res).to.be.an("object");
                assert.equal(question_payload.question, res.question)
                assert.equal(question_payload.user.id, res.userId)
            }
        )
    })

    it("Should generate AI answers", () => {
        const question_payload = {
            question: "what is mocha tests?",
            ai_assist: true,
            ai_assist_type: "tips",
            user: {
                id: 1
            }
        }
        return questionServices.askAI(question_payload).then(res => {
            assert.equal(res.question_asked.question, question_payload.question)
            assert.equal(res.ai_status, 'SmartAI 💡💡💡')
            question_payload.ai_assist_type = 'slowcodegen'
            question_payload.question = "how to declare variables in javascript?"
            return questionServices.askAI(question_payload)
        }).then((res) => {
            assert.equal(res.ai_status, 'SmartAI 💡💡💡')
            question_payload.ai_assist_type = 'fastcodegen'
            question_payload.question = "how to declare variables in javascript?"
            return questionServices.askAI(question_payload)
        }).then((res) => {
            assert.equal(res.ai_status, 'SmartAI 💡💡💡')
        }).catch(err => {
            console.log(err)
        })

    })

    it('Throws error when question is not found', async () => {
        await assert.rejects(questionServices.getQuestionById(0), "Error: No qestions found 😔😔, nobody seems to need help")
    })

    it('Throws error when question is not found for user', async () => {
        await assert.rejects(questionServices.getQuestionsByUser(50), "Error: This user has no questions")
    })



    after(() => {
        //Questions.destroy({ where: { question: "what is mocha tests?" } })

    })
})