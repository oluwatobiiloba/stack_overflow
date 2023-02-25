const { response } = require('express')
const WorkerPool = require('workerpool')
const {hashPassword} = require('../hooks/auth_hooks')
const aiClient = require('../util/ai_helper')
const answerServices = require('../services/answerServices')
const redisClient = require('../util/redis_helper')


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

const ai_call = async (model) => {
    let aiResponse = {}

    return new Promise((resolve, reject) => {
        aiClient.createCompletion(model).then((response) => {
            aiResponse.data = response.data
            aiResponse.status = response.status
            resolve(aiResponse)
        }).catch((err) => {
            reject(err)
        })
    })

}

const save_aiResponse = async (save_params) => {
    return new Promise((resolve, reject) => {
        //initialize redit for worker instance 
        redis_init()
        answerServices.createAnswer(save_params).then((response) => {
            //close redis connection for worker instance
            redisClient.quit()
            resolve(response)
        }).catch((err) => {
            console.log("err", err)
            reject(err)
        })
    })
}



WorkerPool.worker({
    bcryptHashing,
    ai_call,
    save_aiResponse
})