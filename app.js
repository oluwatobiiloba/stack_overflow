require('dotenv').config({path: './.env'});
const express = require("express");
const { sequelize } = require('./models');
const index = require("./routers");
const app = express();
const aiClient = require('./util/ai_helper')
const redisClient = require('./util/redis_helper')
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/config/config.js')[env];
const Honeybadger = require('@honeybadger-io/js');
const Sentry = require("@sentry/node");
const Tracing = require("@sentry/tracing");
const { ProfilingIntegration } = require("@sentry/profiling-node")

let db_init;
let logger;
let redis_init;
let ai_init;


app.use(express.json())

const port = config.app_port;

db_init = async function main(){
   //await sequelize.sync({ alter: true })
    await sequelize.authenticate()
    console.log("table initialized")
}


Sentry.init({
  dsn: process.env.SENTRY_URL,
  integrations: [
    new ProfilingIntegration(),
    new Sentry.Integrations.Http({ tracing: true }),
    new Tracing.Integrations.Express({
      app,
    }),
  ],
  profilesSampleRate: 1.0,
  tracesSampleRate: 1.0,
})



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
app.use(Sentry.Handlers.requestHandler());
app.use(Sentry.Handlers.tracingHandler());
app.use(Sentry.Handlers.errorHandler());

app.get('/',(req,res)=>{
    return res.status(200).json({
      message: 'stackoverflow_lite API',
    })
  })



app.listen(port, ()=>{
  db_init(),
    redis_init(),
      ai_init(),
    logger(),

    setTimeout(() => {
      const transaction = Sentry.startTransaction({
        op: "test",
        name: "My First Test Transaction",
      });
      try {
        foo();
      } catch (e) {
        let error = e + " test"
        console.log(error);
        Sentry.captureException(error);
      } finally {
        transaction.finish();
      }
    }, 99);
  console.log(`server started on port: ${port}`);
})



