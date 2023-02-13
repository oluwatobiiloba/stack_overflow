const commentServices = require('../services/commentServices')

module.exports = {
    async createComment(req, res) {
        const { comment, answerId } = req.body
        const payload = { comment, answerId, userId: req.user.id }

        try {
            const data = await commentServices.creatComment(payload)

            return res.status(201).json({
                status: 'success',
                message: "Comment Posted 🙂",
                data: {
                    data,
                }
            })
        }
        catch (err) {
            console.log(err.message)
            return res.status(500).json(err)
        }
    },

    async getAllComments(_req, res) {
        try {
            const data = await commentServices.getAllComments();
            if (!data) {
                return res.status(404).json({
                    status: 'failed',
                    message: "That's odd, no comments found",
                })
            }
            return res.status(201).json({
                status: "success",
                message: `${data.length} comments found`,
                data: {
                    data
                }
            })
        } catch (err) {
            console.log(err.message)
            return res.status(500).json(err)
        }
    },

    async getCommentsByUserId(req, res) {
        const id = req.params.id

        try {
            const data = await commentServices.getCommentsByUserId(id);
            if (!data) {
                return res.status(404).json({
                    status: 'failed',
                    message: "Sorry, no comments by this user",
                })
            }
            return res.status(201).json({
                status: "success",
                message: `${data.length} comments found`,
                data: {
                    data
                }
            })
        } catch (err) {
            console.log(err.message)
            return res.status(404).json({
                status: 'Not found',
                message: err.message,
                data: {
                    err
                }
            })
        }
    },

    async getCommentsByAnswerId(req, res) {
        const id = req.params.id
        try {
            const data = await commentServices.getCommentsByAnswerId(id);
            return res.status(201).json({
                status: "success",
                message: `${data.length} comments found`,
                data: {
                    data
                }
            })
        } catch (err) {
            console.log(err.message)
            return res.status(404).json({
                status: 'Not found',
                message: err.message,
                data: {
                    err
                }
            })
        }
    }
}
