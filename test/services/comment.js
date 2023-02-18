'use strict';
let chai = require('chai');
const { Comments } = require('../../models')
let expect = chai.expect;
let assert = require('assert');
const commentServices = require('../../services/commentServices')



describe("Test Comment Services", () => {
    it('should get all Comments', () => {
        return commentServices.getAllComments().then(
            (res) => {
                expect(res).to.be.an("array");
                expect(res.length).to.be.greaterThanOrEqual(1)
            }
        ).catch(err => {
            console.log(err)
        })
    })


    it('should create comment', () => {
        const comment_payload = {
            comment: 'Mocha test',
            userId: 1,
            answerId: 1
        }

        return commentServices.creatComment(comment_payload).then(
            (res) => {
                expect(res).to.be.an("object");
                assert.equal(comment_payload.comment, res.comment)
                assert.equal(comment_payload.userId, res.userId)
            }
        )
    })


    it('should get comments by user id ', () => {
        const user_id = 1
        return commentServices.getCommentsByUserId(user_id).then(
            (res) => {
                expect(res).to.be.an("array");
                assert.equal(res[0].userId, 1);
            }
        ).catch(err => {
            console.log(err)
        })
    })

    it('should get comments by answer id', () => {
        return commentServices.getCommentsByAnswerId(1).then(
            (res) => {
                expect(res).to.be.an("array");
                assert.equal(res[0].answerId, 1)
            }
        )
    })


    it('Throws error when comment is not found', async () => {
        await assert.rejects(commentServices.getCommentsByUserId(0), "Error: This user has no comments, perhaps they're shy🤓")
    })

    it('Throws error when comment is not found for answer', async () => {
        await assert.rejects(commentServices.getCommentsByAnswerId(20), "Error: This answer has no comments 🤥")
    })

    it('Throws error when answer doesnt exist', async () => {
        await assert.rejects(commentServices.getCommentsByAnswerId(700), "Error: This answer does not exist 🤔")
    })

    it('Throws error when answer doesnt exist when creating comment', async () => {
        const comment_payload = {
            comment: 'Mocha test',
            userId: 1,
            answerId: 700
        }
        await assert.rejects(commentServices.creatComment(comment_payload), "Error: This answer does not exist 🤔")
    })

    after(async () => {
        await Comments.destroy({ where: { comment: "Mocha test" } })

    })
})