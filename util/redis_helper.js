const env = process.env.NODE_ENV || 'development';
const config = require(`${__dirname}/../config/config.js`)[env];
let connection_options = null
if (config.NODE_ENV === 'development') {
    connection_options = {
        url: `rediss://${config.AZURE_CACHE_FOR_REDIS_HOST_NAME}:6380`,
        password: `${config.AZURE_CACHE_FOR_REDIS_ACCESS_KEY}=`,
    }
} else {
    connection_options = process.env.REDIS_URL
}

module.exports = require('redis').createClient(connection_options);