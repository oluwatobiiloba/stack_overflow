const { Questions, sequelize } = require('../models')
const aiClient = require('../util/ai_helper')
const answerServices = require('./answerServices')
const worker_pool = require('../worker-pool/init')

 module.exports = {

     createQuestion(data) {
         const { question, user } = data
         return sequelize.transaction((t) => {
             return Questions.create({ question, userId: user.id }, { transaction: t })
                 .then(
                     (question_asked) => {
                         return question_asked
                     }
             )
         })
        },

     askAI(data) {
         const { question, user, ai_assist, ai_assist_type } = data
         let model = null
         let pool = null
         return sequelize.transaction((t) => {
             return Questions.create({ question, userId: user.id }, { transaction: t })
                 .then(
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
                         switch (ai_assist_type) {
                             case 'tips':
                                 model = ai_models.ideas;
                                 break;
                             case 'slowcodegen':
                                 model = ai_models.slowcodegen;
                                 break;
                             case 'fastcodegen':
                                 model = ai_models.fastcodegen;
                                 break;
                             default:
                                 throw new Error("Invalid question type");
                         }
                         //Pool worker selector
                         pool = await worker_pool.get_proxy();

                         return [pool, model, question_id, ai_assist, askQuestion]
                     }

             ).then(async ([pool, model, question_id, ai_assist, askQuestion]) => {
                 if (pool.ai_call) {
                     return [await pool.ai_call(model), question_id, ai_assist, askQuestion]
                 } else {
                     return [await aiClient.createCompletion(model), question_id, ai_assist, askQuestion]
                 }
             }).catch(
                 err => {
                     throw err
                 });
         }).then(async ([aiResponse, question_id, ai_assist_required, question_asked]) => {
             const respdata = aiResponse.data
             const respstatus = aiResponse.status
             const ai_answer = (ai_assist) ? respdata.choices[0].text : "Not availabale or selected";
             const ai_status = (respstatus === 200) ? "SmartAI 💡💡💡" : "I'm yet to learn that";
           //save AI answer

             const save_params = {
                 answer: ai_answer,
                 userId: process.env.AI_UUID || 0,
                 questionId: question_id

             }
               // Save Ai answere to db
             if (ai_assist_required) {
                 await answerServices.createAnswer(save_params)
             }
             return { question_asked, ai_answer, ai_status }

         }).catch((err) => {
             throw err
         })
        },

     getAllQuestions() {
            const fields = ['user'];
         return sequelize.transaction(async (t) => {
             try {
                 const questions = await Questions.findAll({ include: fields }, { transaction: t })
                 if (!questions || questions.length < 1) {
                     throw new Error('No questions found 😔😔, nobody seems to need help')
                 }
                 return questions
             } catch (err) {
                 throw new Error("Error occured while fetching questions")
             }
         })
        },

     getQuestionById(id) {
         const fields = ['user', 'answers'];

         return sequelize.transaction((t) => {
             return Questions.findOne({ where: { id }, include: fields }, { transaction: t }).then((question) => {
                 if (!question) {
                     throw new Error('No qestions found 😔😔, nobody seems to need help')
                 }
                 return question
             })
         })

        },


     async getQuestionsByUser(id) {
         const question = await Questions.findAll({ where: { userId: id }, include: ['user'] })
         if (!question || question.length < 1) {
             throw new Error("This user has no questions")
         }
         return question

        }

        
 }

