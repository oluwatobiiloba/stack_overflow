const { response } = require('express')
const WorkerPool = require('workerpool')
const {hashPassword} = require('../hooks/auth_hooks')
const aiClient = require('../util/ai_helper')
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



WorkerPool.worker({
    bcryptHashing,
    ai_call
})