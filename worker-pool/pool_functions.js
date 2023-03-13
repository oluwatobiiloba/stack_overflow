const WorkerPool = require('workerpool')
const {hashPassword} = require('../hooks/auth_hooks')
const aiClient = require('../util/ai_helper')
const answerServices = require('../services/answerServices')
const redisClient = require('../util/redis_helper')
const sendEmail = require('../util/mailer')
const authServices = require('../services/authServices')
const middleware = require('../middleware')


    //initializes redis server connection
const redis_init = async () => {
    redisClient.on('error', err => console.error('Redis Client Error', err))
    await redisClient.connect().then(
        console.log('Redis server connected for pool worker')
    ).catch(err => {
        console.log('Redis initialization failed:', err)
    })
}


/**
 * Function to set worker services
 * @returns corresponding function
 */

const bcryptHashing = (user) => {
    return hashPassword(user)
}
//initialize aiClient for worker instance and make network call
const ai_call = (model) => {
    const aiResponse = {}
    return new Promise((resolve, reject) => {
        aiClient.createCompletion(model).then((response) => {
             //store response data and status in aiResponse object
            aiResponse.data = response.data
            aiResponse.status = response.status
            resolve(aiResponse)
        }).catch((err) => {
            //reject promise if error encountered
            reject(err)
        })
    })

}

// This function creates an AI response and saves it to the DB
const save_aiResponse = (save_params) => {
    return new Promise((resolve, reject) => {
        //initialize redit for worker instance 
        redis_init()
        answerServices.createAnswer(save_params).then((response) => {
            //close redis connection for worker instance
            redisClient.quit()
            resolve(response)
        }).catch((err) => {
            redisClient.quit()
            reject(err)
        })
    })
}
// This function creates an AI response and saves it to the DB
const update_userpassword = (user, password) => {
    return new Promise((resolve, reject) => {
        authServices.resetPassword(user, password).then((response) => {
            resolve(response)
        }).catch((err) => {
            reject(err)
        })
    })
}

//send emails to users
const sendMail = (mailOptions) => {
    return new Promise((resolve, reject) => {
        sendEmail(mailOptions, (err, info) => {
            if (err) {
                reject(err)
            } else {
                console.log(`Email sent: ${info.response}`)
                resolve(info)
            }
        })
    })
}

//upload image
const upload_image = async (data) => {
    try {
        let payload = data
        payload.uploadData.is_worker = true

        const resized_photo = await middleware.resizephoto(payload.uploadData)
        payload = resized_photo
        const uploaded_image = await authServices.upload_image(payload)
      return uploaded_image
  } catch (err) {
      console.log(err)
      throw err;
  }
}



WorkerPool.worker({
    bcryptHashing,
    ai_call,
    save_aiResponse,
    sendMail,
    update_userpassword,
    upload_image
})