const answersServices = require('../services/answerServices')

module.exports = {
    async createAnswer(req, res) {
        // const { answer, userId, questionId } = data;
        const payload = req.body;
        payload.userId = req.user.id
        try {
            const data = await answersServices.createAnswer(payload);
            return res.status(201).json({
                status: 'success',
                message: "Answer Created",
                data: {
                    data
                }
            })
        } catch (err) {
            console.log(err.message)
            return res.status(500).json(err)
        }


    },

    async vote(req, res) {
        const payload = req.body;
        const user = req.user

        try {
            const data = await answersServices.voteAnswer(payload, user);
            return res.status(201).json({
                status: 'success',
                message: `Vote logged`,
                data: {
                    data
                }
            })
        } catch (err) {
            return res.status(500).json({
                status: 'failed',
                message: err.message,
            })
        }

    },

    async getAllAnswers(_req, res) {

        try {
            const data = await answersServices.getAllAnswers();
            return res.status(201).json({
                status: 'success',
                message: `${data.Answers.length} Answer(s) found`,
                fromCache: data.isCached,
                data: data.Answers
            })
        } catch (err) {
            console.log(err.message)
            return res.status(500).json({
                status: 'failed',
                message: err.message,
            })
        }
    },

    async getAnswerById(req, res) {
        try {

            //uuid
            const data = await answersServices.getAnswerById(req.params.id);
            return res.status(201).json({
                status: 'success',
                message: `Answer found`,
                data: {
                    isAi: data.isAi,
                    answer: data.answer
                }
            })
        } catch (err) {
            console.log(err.message)
            return res.status(500).json(
                {
                    status: 'failed',
                    message: err.message,
                }
            )
        }
    },

    async getAnswerByUserIdandQuestionId(req, res) {

        const payload = {
            user_id: req.params.user_id,
            question_id: req.params.question_id
        }
        try {
            const data = await answersServices.getAnswerByUserIdandQuestionId(payload);
            return res.status(201).json({
                status: 'success',
                message: `${data.length} Answer(s) found`,
                data
            })
        } catch (err) {
            console.log(err.message)
            return res.status(500).json(
                {
                    status: 'failed',
                    message: err.message,
                }
            )
        }
    }
}
