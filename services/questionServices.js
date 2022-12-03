const {Questions, User} = require('../models')
const aiClient = require('../util/ai_helper')
const answerServices = require('./answerServices')

 module.exports = {

        createQuestion: async function(query){
           const { question,userUuid } = query.body
           const user = await User.findOne({where: {uuid: userUuid}})
           if(!user){
            throw new Error('Are you a registered user?? 😬👀')
           }
           const askQuestion = await Questions.create({question,userId:user.id})
           .catch(
            err => {
            console.log(err.message);
            throw err
        });

        return askQuestion
        },

        askAI: async function(query){
            const { question,userUuid, ai_assist ,ai_assist_type } = query.body
            let model
            let aiResponse = {
                data: "Unavailable",
                status: "not used"
            }
            const user = await User.findOne({where: {uuid: userUuid}})
            if(!user){
             throw new Error('Are you a registered user?? 😬👀')
            }
            //log Question in db
            const askQuestion = await Questions.create({question,userId:user.id})
            .catch(
             err => {
             console.log(err.message);
             throw err
         });
         
         let ai_models = {
            fastcodegen: {
                model: "code-cushman-001",
                prompt: question,
                temperature: 0,
                max_tokens: 1000,
                top_p: 1,
                frequency_penalty: 0,
                presence_penalty: 0,
              },
  
            slowcodegen:  {
                model: "code-davinci-002",
                prompt: question,
                temperature: 0,
                max_tokens: 1000,
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

         if(ai_assist){
            if(ai_assist_type === 'tips'){
                model = ai_models.ideas
            } else if(ai_assist_type === 'slowcodegen'){
                model = ai_models.slowcodegen
            } else if(ai_assist_type === 'fastcodegen'){
                model = ai_models.fastcodegen
            }
            console.log(model)
            aiResponse = await aiClient.createCompletion(model);  
         }
         
         //let ai_answer = aiResponse.data.choices.text
          let ai_answer = (ai_assist) ? aiResponse.data.choices[0].text :"Not availabale or selected" ;
          console.log(aiResponse.data)
          let ai_status = (aiResponse.status === 200) ? "SmartAI 💡💡💡" : "I'm yet to learn that";
          //save AI answer
          let save_params={ 
            body:{
                answer: ai_answer,
                userUuid: process.env.AI_UUID,
                questionUuid: askQuestion.uuid
            }
        }
          
        if(ai_assist){answerServices.createAnswer(save_params)}
         return {askQuestion,ai_status,ai_answer}
        },

        getAllQuestions: async function(){
            const fields = ['user'];

          try{
            const questions = await Questions.findAll({include:fields})
            if(!questions){
                    throw new Error('No qestions found 😔😔, nobody seems to need help')}
            return questions
        }catch(err){
                console.log(err.message);
                    throw err}
           
        },

        getQuestionById: async function(uuid){
            let fields = ["user",'answers'];

            const question = await Questions.findOne({where:{uuid:uuid}, include:fields})
                .catch(err=> {
                    console.log(err.message);
                throw err
                });
            if(!question){
                    throw new Error('No qestions found 😔😔, nobody seems to need help')
            }
            return question
        },

        getQuestionsByUser: async function(userId){
            let fields = ["user"]

            const user = await User.findAll({where:{uuid:userId}});
            if(!user){
                throw new Error("No user with that Id")}

            const question = await Questions.findAll({where: {userId:user.id}})
                .catch(
                    err => {
                        console.log(err.message);
                    throw err
                    })
            if(!question){
                throw new Error("This user has no questions")
            }
            data = {question,user}
            return data
        }

        
 }

