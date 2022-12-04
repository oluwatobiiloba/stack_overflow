
const aiEngine = require('openai');
const configurations = new aiEngine.Configuration(
    {
      organization: process.env.AI_ORG,
      apiKey: process.env.AI_KEY
    }
  )
  const ai = new aiEngine.OpenAIApi(configurations)


module.exports = ai
