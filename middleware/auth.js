const authServices = require('../services/authServices');

module.exports = async (req, res, next) => {
    let token = null;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    } else if (req.headers.cookie) {
        token = req.headers.cookie.split('=')[1]
    }
    try {
        const user = await authServices.protect(token)
        req.user = user
    } catch (err) {

        return res.status(401).json({
            status: 'failed',
            message: "Sorry, You need to be logged in",
            data: {
                message: err.message
            }
        })
    }
    //console.log(req)
    return next()
};  