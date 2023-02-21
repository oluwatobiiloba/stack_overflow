const WorkerPool = require('workerpool')
const {hashPassword} = require('../hooks/auth_hooks')

const bcryptHashing = async (user) => {
    return hashPassword(user)
}
WorkerPool.worker({
    bcryptHashing
})