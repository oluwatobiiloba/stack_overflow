'use strict';
let chai = require('chai');
const { where } = require('sequelize');
const { sequelize, User } = require('../../models')
const jwt = require('jsonwebtoken');;
let expect = chai.expect;
let should = chai.should();

const authServices = require('../../services/authServices');


describe("Auth Services", function () {

    let email = "mocha@mochatest.com"
    let password = "password"
    let username = "mocha"
    let first_name = "Mocha"
    let last_name = "Chai"
    let phonenumber = "08103234202"
    let role = "1"
    let user_id
    let data = {}
    let regData = {
        email: email + "test",
        password: password + "test",
        username: username + "test",
        first_name: first_name + "test",
        last_name: last_name + "test",
        phonenumber: phonenumber + "1"

    }

    before(async function () {
        //Check for test UserID
        let user = await User.findOne({ where: { email: email, first_name: first_name, last_name: last_name } }) 
        user_id = user.id
    })

    it("should have functions (signToken,createSendToken,registerUser,signIn,protect)", async function (done) {
        authServices.should.have.property("createSendToken")
        authServices.should.have.property("signToken")
        authServices.should.have.property("registerUser")
        authServices.should.have.property("signIn")
        authServices.should.have.property("protect")
        done()
    })

    it("should signToken", function (done) {
        let id = "10"
        let result = authServices.signToken(id)
        let verif = jwt.verify(result, process.env.JWT_SECRET)
        verif.should.be.a('object')
        verif.should.have.property('id')
        verif.should.have.property('iat')
        verif.should.have.property('exp')
        verif.id.should.be.equal(id)
        done()
    })

    it("should login a user", function (done) {
        data.email = email
        data.password = password
        data.username = username

        let query = { body: data }
        authServices.signIn(query)
            .then(function (result) {
                result.should.be.a('object')
                result.respObj.id.should.equal(user_id)
                result.respObj.should.have.property("email")
                result.respObj.email.should.equal(email)
                result.respObj.should.have.property("first_name")
                result.respObj.first_name.should.equal(first_name)
                result.respObj.should.have.property("last_name")
                result.respObj.last_name.should.equal(last_name)
                result.respObj.should.have.property("sendToken")
                result.respObj.sendToken.should.be.a("object")
                result.respObj.sendToken.should.have.property("cookieOptions")
                result.respObj.sendToken.should.have.property("token")


                done()
            })
            .catch(function (error) {
                done(error)
            })

    })


    it("should register a user", function (done) {
        let query = { body: regData }
        authServices.registerUser(query)
            .then(function (result) {
                result.should.be.a('object')
                result.respObj.should.have.property("email")
                result.respObj.email.should.equal(regData.email)
                result.respObj.should.have.property("first_name")
                result.respObj.first_name.should.equal(regData.first_name)
                result.respObj.should.have.property("last_name")
                result.respObj.last_name.should.equal(regData.last_name)
                result.respObj.should.have.property("token")
                done()
            })
            .catch(function (error) {
                done(error)
            })
    })

    after(function (done) {
        User.destroy({ where: { email: regData.email } })
        done()
    })

})