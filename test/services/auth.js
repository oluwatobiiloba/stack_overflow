'use strict';
const config = require('../../config/config')[process.env.NODE_ENV || 'development'];
let chai = require('chai');
const { where } = require('sequelize');
const { sequelize, User } = require('../../models')
const jwt = require('jsonwebtoken');;
let expect = chai.expect;
let assert = chai.assert;

const authServices = require('../../services/authServices');

describe("Auth Services", (done) => {
    let email = "mocha@mochatest.com"
    let password = "password"
    let username = "mocha"
    let first_name = "Mocha"
    let last_name = "Chai"
    let phonenumber = "08103234202"
    let role = "1"
    const loginData = { email, password, username }

    let regData = {
        email: email + "test",
        password: password + "test",
        username: username + "test",
        first_name: first_name + "test",
        last_name: last_name + "test",
        phonenumber: phonenumber + "1"

    }
    let test_user = { id: 1 }
    let token = authServices.createSendToken(test_user)
    const req = {
        headers: {
            authorization: `Bearer ${token.token}`,
            'content-type': 'application/json',
            'user-agent': 'PostmanRuntime/7.30.0',
            accept: '*/*',
            'postman-token': '29844342-3233-4c56-b3cf-7b085960dff3',
            host: '127.0.0.1:3535',
            'accept-encoding': 'gzip, deflate, br',
            connection: 'keep-alive',
            'content-length': '118',
            cookies: {
                jwt: token.token,
                cookieOptions: token.cookieOptions,
            }

        }
    }
    const user_id = process.env.NODE_ENV === "development" ? 19 : 1


    describe('should have functions (signToken,createSendToken,registerUser,signIn,protect)', () => {
        it('should have a function signToken', () => {
            console.log('signToken');
            expect(authServices.signToken).to.be.a('function');

        });
        it('should have a function createSendToken', () => {
            console.log('createSendToken');
            expect(authServices.createSendToken).to.be.a('function');

        });
        it('should have a function registerUser', () => {
            console.log('registerUser');
            expect(authServices.registerUser).to.be.a('function');

        });
        it('should have a function signIn', () => {
            console.log('signIn');
            expect(authServices.signIn).to.be.a('function');

        });
        it('should have a function protect', () => {
            console.log('protect');
            expect(authServices.protect).to.be.a('function');

        });
    });

    it('test auth.createSendToken', () => {
        const user = { id: 1 };
        const statusCode = null;
        const res = null;
        const sendToken = authServices.createSendToken(user, statusCode, res);
        expect(sendToken).to.be.an('object');
        expect(sendToken).to.have.property('token');
        expect(sendToken).to.have.property('cookieOptions');

    })

    it("should protect a route", () => {
        return authServices.protect(req)
            .then((result) => {
                expect(result).to.be.an("object");
                expect(result).to.have.property("headers");
                expect(result.headers).to.have.property("cookies");
                expect(result).to.have.property("user");
                expect(result.user.id).to.be.a("number");
            })
            .catch(error => {
                console.log(error)
            });
    });

    it("should test route protection errors", () => {
        req.headers.authorization = null
        return authServices.protect(req)
            .catch((error) => {
                expect(error).to.be.an("error");
                expect(error.message).to.equal("Not Authorized");

            })

    });

    it("should test route protection errors", () => {
        req.headers.cookies.jwt = null;
        req.headers.authorization = null;
        return authServices.protect(req).catch((error) => {
            expect(error).to.be.an("error");
            expect(error.message).to.equal("Not Authorized");
        })
    });

    it("should test route protection errors", () => {
        test_user = { id: 100 }
        token = authServices.createSendToken(test_user)
        req.headers.authorization = `Bearer ${token.token}`;
        req.headers.cookies.jwt = token.token;

        return authServices.protect(req)
            .catch((error) => {
                expect(error).to.be.an("error");
                expect(error.message).to.equal("This user does not exist anymore");

            })

    });


    it("should signToken", () => {
        let id = "10"
        let result = authServices.signToken(id)
        const data = jwt.verify(result, config.JWT_SECRET)
        expect(data).to.be.an('object');
        expect(data).to.have.property('id');
        expect(data.id).to.equal(id);

    })

    it("should login a user", () => {
        return authServices.signIn(loginData)
            .then((result) => {
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
            })
            .catch((error) => {
                done(error)
            })

    })

    it('test No username or password', () => {
        delete loginData.username
        authServices.signIn(loginData).catch(err => {
                assert.equal(err.message, 'Please provide username and password');
            })

    })

    it('test Invalid username Error ', () => {
        loginData.username = username + "test"
        authServices.signIn(loginData)
            .then((payload) => {
                assert.equal(payload, 1);
            })
            .catch(err => {
                assert.equal(err.message, "Incorrect username or password");
            })
    })

    it("should register a user", () => {
        let query = regData
        authServices.registerUser(query)
            .then((result) => {
                result.should.be.a('object')
                result.respObj.should.have.property("email")
                result.respObj.email.should.equal(regData.email)
                result.respObj.should.have.property("first_name")
                result.respObj.first_name.should.equal(regData.first_name)
                result.respObj.should.have.property("last_name")
                result.respObj.last_name.should.equal(regData.last_name)
                result.respObj.should.have.property("token")
                done()
            }).catch((error) => {
                done(error)
            })
    })

    after(() => {
        User.destroy({ where: { email: regData.email } })

    })
})

