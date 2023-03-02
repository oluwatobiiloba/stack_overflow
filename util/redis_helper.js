const env = process.env.NODE_ENV || 'development';
const config = require(`${__dirname}/../config/config.js`)[env];
module.exports = require('redis').createClient({
    url: `rediss://${config.AZURE_CACHE_FOR_REDIS_HOST_NAME}:6380`,
    password: config.AZURE_CACHE_FOR_REDIS_ACCESS_KEY + '=',
});