require('dotenv').config({path: './.env'});
const express = require("express");
const { sequelize } = require('./models');
const index = require("./routers");
const app = express();
const aiClient = require('./util/ai_helper')
const redisClient = require('./util/redis_helper')


app.use(express.json())

const port = process.env.PORT;

db_init = async function main(){
   //await sequelize.sync({ alter: true })
    await sequelize.authenticate()
    console.log("table initialized")
}

redis_init = async ()=>{
  redisClient.on('error', err => console.error('Redis Client Error', err))
  await redisClient.connect().then(
    console.log('Redis server connected')
  ).catch(err => {
    console.log('Redis initialization failed:', err)
  })
    
}
//INITIALIZE OPEN AI

  ai_init = async () => {

    const response = await aiClient.listEngines()
    if(response.status === 200){
      console.log('AI engine is up and running!! 🤖🤖🤖🤖')
    } else {
      console.log('Unable to run AI 💥')
    }
  }
  



app.use('/api/v1/', index);

app.get('/',(req,res)=>{
    return res.status(200).json({
      message: 'stackoverflow_lite API',
    })
  })

app.listen(port, ()=>{
    db_init(),
    redis_init(),
    ai_init()
    console.log(`server started on port: ${port}`)
})

