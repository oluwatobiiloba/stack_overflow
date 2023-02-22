const WorkerPool = require('workerpool')
const {hashPassword} = require('../hooks/auth_hooks')

/**
 * Function to set worker services
 * @returns corresponding function
 */

const bcryptHashing = (user) => {
    return hashPassword(user)
}
WorkerPool.worker({
    bcryptHashing
})