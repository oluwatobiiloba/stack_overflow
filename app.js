require('dotenv').config({path: './.env'});
const express = require("express");
const { sequelize } = require('./models');
const index = require("./routers");
const app = express();
const aiClient = require('./util/ai_helper')
const redisClient = require('./util/redis_helper')
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/config/config.js')[env];
const Honeybadger = require('@honeybadger-io/js')
let db_init
let logger
let redis_init;
let ai_init;


app.use(express.json())

const port = config.app_port;

db_init = async function main(){
   //await sequelize.sync({ alter: true })
    await sequelize.authenticate()
    console.log("table initialized")
}

logger = function main() {
  Honeybadger.configure({
    apiKey: process.env.HONEYBADGER_API_KEY,
  });
  console.log("Honey badger Configured")
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
      ai_init(),
      logger()
    console.log(`server started on port: ${port}`)
})

