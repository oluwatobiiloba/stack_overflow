'use strict';
let chai = require('chai');
const { where } = require('sequelize');
const { sequelize, User } = require('../models')
const jwt = require('jsonwebtoken');;
let expect = chai.expect;
let assert = chai.assert;

const authServices = require('../services/authServices'); 
console.log("before describe", authServices);

describe("Auth Services", async function (done) {
    console.log("here", authServices);
    // let email = "mocha@mochatest.com"
    // let password = "password"
    // let username = "mocha"
    // let first_name = "Mocha"
    // let last_name = "Chai"
    // let phonenumber = "08103234202"
    // let role = "1"
    // let user_id
    // let loginData = {
    //     email, password, username
    // }
    // let regData = {
    //     email: email + "test",
    //     password: password + "test",
    //     username: username + "test",
    //     first_name: first_name + "test",
    //     last_name: last_name + "test",
    //     phonenumber: phonenumber + "1"

    // }
    // let test_user = { id: 19 }
    // let token = await authServices.createSendToken(test_user)
    // let req = {
    //     headers: {

    //         authorization: `Bearer ${token.token}`,
    //         'content-type': 'application/json',
    //         'user-agent': 'PostmanRuntime/7.30.0',
    //         accept: '*/*',
    //         'postman-token': '29844342-3233-4c56-b3cf-7b085960dff3',
    //         host: '127.0.0.1:3535',
    //         'accept-encoding': 'gzip, deflate, br',
    //         connection: 'keep-alive',
    //         'content-length': '118',
    //         cookies: {
    //             jwt: token.token,
    //             cookieOptions: token.cookieOptions,
    //         }

    //     }
    // }
    // console.log('req', req);
    // beforeAll(async function () {
    //     await sequelize.sync({ force: true });
    //     let user = await User.create(regData);
    //     user_id = user.id;
    //     console.log(user_id);
    // })
    //     //Check for test UserID
    //     if (process.env.NODE_ENV === "development") {
    //         user_id = 19
    //     } else {
    //         user_id = 1
    //     }


    console.log(token);
    console.log("here too", authServices);
    console.log(test_user);

    describe('should have functions (signToken,createSendToken,registerUser,signIn,protect)', function (done) {
        it('should have a function signToken', function (done) {
            console.log('signToken');
            expect(authServices.signToken).to.be.a('function');
            done();
        });
        it('should have a function createSendToken', function (done) {
            console.log('createSendToken');
            expect(authServices.createSendToken).to.be.a('function');
            done();
        });
        it('should have a function registerUser', function (done) {
            console.log('registerUser');
            expect(authServices.registerUser).to.be.a('function');
            done();
        });
        it('should have a function signIn', function (done) {
            console.log('signIn');
            expect(authServices.signIn).to.be.a('function');
            done();
        });
        it('should have a function protect', function (done) {
            console.log('protect');
            expect(authServices.protect).to.be.a('function');
            done();
        });
    });

    it("should have functions (signToken,createSendToken,registerUser,signIn,protect)", async function (done) {
        console.log(authServices)
        authServices.should.have.property("createSendToken")
        authServices.should.have.property("signToken")
        authServices.should.have.property("registerUser")
        authServices.should.have.property("signIn")
        authServices.should.have.property("protect")
        done()
    })

    it('test auth.createSendToken', async function () {
        // call the function
        console.log("here")
        let user = { id: 1 };
        let statusCode = null;
        let res = null;
        let result = await authServices.createSendToken(user, statusCode, res);
        result.should.be.a('object')
        result.should.have.property("cookieOptions")
        result.should.have.property("token")
    })



    it("should protect a route", async function () {

        authServices.protect(req)
            .then(function (result) {
                result.should.be.a('object')
                result.should.have.property("headers")
                result.headers.should.have.property("cookies")
                result.should.have.property("user")
                result.user.id.should.be.a("number")
                result.user.id.should.equal(19)

            })
            .catch(async function (error) {
                console.log(error);
                done(error)
            })


    });

    it("should test route protection errors", async function () {
        req.headers.authorization = null
        authServices.protect(req)
            .catch(async function (error) {
                expect(error).to.exist;
                done(error)
            })

    });

    it("should test route protection errors", async function () {
        req.headers.cookies.jwt = null;
        req.headers.authorization = null;
        authServices.protect(req)
            .catch(async function (error) {
                console.log(error)
                expect(error).to.exist;
                done(error)
            })

    });


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

        authServices.signIn(loginData)
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

    it('test No username or password', function () {
        delete loginData.username
        authServices.signIn(loginData)
            .then(function (payload) {
            })
            .catch(err => {
                assert.equal(err.message, 'Please provide username and password');
            })

    })

    it('test Invalid username Error ', function () {
        loginData.username = username + "test"
        authServices.signIn(loginData)
            .then(function (payload) {

                assert.equal(payload, 1);
            })
            .catch(err => {
                assert.equal(err.message, "Incorrect username or password");

            })
    })

    it("should register a user", function (done) {
        let query = regData
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

    done()

})

