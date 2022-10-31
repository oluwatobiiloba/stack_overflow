 const {Questions, User} = require('../models')

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

