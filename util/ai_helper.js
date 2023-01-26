
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.js')[env];
const aiEngine = require('openai');
const configurations = new aiEngine.Configuration(
    {
    organization: config.AI_ORG,
    apiKey: config.AI_KEY
    }
  )
  const ai = new aiEngine.OpenAIApi(configurations)


module.exports = ai
