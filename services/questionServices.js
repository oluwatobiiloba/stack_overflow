const { Questions, User, sequelize } = require('../models')
const aiClient = require('../util/ai_helper')
const answerServices = require('./answerServices')

 module.exports = {

     createQuestion(data) {
         const { question, user } = data
         return sequelize.transaction((t) => {
             return Questions.create({ question, userId: user.id }, { transaction: t })
                 .then(
                     (question) => {
                         return question
                     }
             )
         })
        },

     async askAI(data) {
         const { question, user, ai_assist, ai_assist_type } = data
         let model = null
            let aiResponse = {
                data: "Unavailable",
                status: "not used"
            }

            let ai_status = {}
            let ai_answer = {}

         return sequelize.transaction(async (t) => {
             return User.findOne({ where: { id: user.id } }, { transaction: t })
                 .then(
                     (user) => {
                         if (!user) {
                             throw new Error('Are you a registered user?? 😬👀')
                         }
                         //log Question in db

                         return Questions.create({ question, userId: user.id }, { transaction: t })
                     }
                 ).then(
                     async (askQuestion) => {

                         const question_id = askQuestion.id
                         const ai_models = {
                             fastcodegen: {
                                 model: "code-cushman-001",
                                 prompt: question,
                                 temperature: 0,
                                 max_tokens: 1000,
                                 top_p: 1,
                                 frequency_penalty: 0,
                                 presence_penalty: 0,
                             },

                            slowcodegen: {
                                model: "code-davinci-002",
                                prompt: question,
                                temperature: 0,
                                max_tokens: 3000,
                                top_p: 1,
                                frequency_penalty: 0,
                                presence_penalty: 0,
                            },
                            ideas: {
                                model: "text-davinci-001",
                                prompt: question,
                                temperature: 0.4,
                                max_tokens: 1000,
                                top_p: 1,
                                frequency_penalty: 0,
                                presence_penalty: 0,
                            }

                        }

                        //AI model selector
                         if (ai_assist) {
                             if (ai_assist_type === 'tips') {
                                model = ai_models.ideas
                            }
                            if (ai_assist_type === 'slowcodegen') {
                                model = ai_models.slowcodegen
                            }
                            if (ai_assist_type === 'fastcodegen') {
                                model = ai_models.fastcodegen
                            }

                            //AI Lookup
                            aiResponse = await aiClient.createCompletion(model);
                        }
                        let respdata = aiResponse.data
                        let respstatus = aiResponse.status
                         return [respdata, respstatus, question_id, ai_assist, askQuestion]
                     }

             ).catch(
                 err => {
                     throw err
                 });

         }).then(async ([respdata, respstatus, question_id, ai_assist, question]) => {

             ai_answer = (ai_assist) ? respdata.choices[0].text : "Not availabale or selected";

             ai_status = (respstatus === 200) ? "SmartAI 💡💡💡" : "I'm yet to learn that";
           //save AI answer

             const save_params = {
                 answer: ai_answer,
                 userId: process.env.AI_UUID || 0,
                 questionId: question_id

             }
               // Save Ai answere to db
             if (ai_assist) {
                 await answerServices.createAnswer(save_params)
             }
             return { question, ai_answer, ai_status }

         }).catch((err) => {
             console.log(err)
         })
        },

     getAllQuestions() {
            const fields = ['user'];
         return sequelize.transaction(async (t) => {
             try {
                 const questions = await Questions.findAll({ include: fields }, { transaction: t })
                 if (!questions) {
                     throw new Error('No qestions found 😔😔, nobody seems to need help')
                 }
                 return questions
             } catch (err) {
                 console.log(err.message);
                 throw err
             }
         })
        },

     getQuestionById(uuid) {
         const fields = ['user', 'answers'];

         return sequelize.transaction((t) => {
             return Questions.findOne({ where: { uuid: uuid }, include: fields }, { transaction: t }).then((question) => {
                 if (!question) {
                     throw new Error('No qestions found 😔😔, nobody seems to need help')
                 }
                 return question
             })
         })

        },


     async getQuestionsByUser(id) {
         const question = await Questions.findAll({ where: { userId: id }, include: ['user'] })
         if (!question) {
             throw new Error("This user has no questions")
         }
         return question

        }

        
 }

