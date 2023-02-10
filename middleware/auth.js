const jwt = require("jsonwebtoken");
const authServices = require('../services/authServices');

module.exports = async (req, res, next) => {
    let decoded = null;
    let token = null;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    } else if (req.headers.cookie) {
        token = req.headers.cookie.split('=')[1]
    }
    try {
        req.user = await authServices.protect(token)
    } catch (err) {
        console.log(err)
        return res.status(401).json({
            status: 'failed',
            message: "Sorry, You need to be logged in",
            data: {
                message: err.message
            }
        })
    }
    //console.log(req)
    next()
};  