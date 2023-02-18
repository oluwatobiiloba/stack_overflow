'use strict';
let chai = require('chai');
let expect = chai.expect;

const voteServices = require('../../services/voteServices')

describe("Test All votes Functionality", () => {
    it('should get all votes', () => {
        return voteServices.getVotes().then(
            (res) => {
                expect(res).to.be.an("array");
                expect(res.length).to.be.greaterThanOrEqual(1)
            }
        ).catch((err) => {
            console.log(err)
        })
    })


})