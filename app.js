require('dotenv').config({path: './.env'});
const express = require("express");
const { sequelize } = require('./models');
const index = require("./routers");
const app = express();
const aiClient = require('./util/ai_helper')
const redisClient = require('./util/redis_helper')
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/config/config.js')[env];
const Honeybadger = require('./util/logger');
const Sentry = require("@sentry/node");
const Tracing = require("@sentry/tracing");
const { ProfilingIntegration } = require("@sentry/profiling-node")

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

//Sentry Monitoring
const transaction = Sentry.startTransaction({
  op: "App.js",
  name: "Server Initialization",
});

let db_init;
let redis_init;
let ai_init;

const port = config.app_port;

db_init = async function main() {
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

app.use(Honeybadger.requestHandler)
app.use(express.json())
app.use('/api/v1/', index);
app.use(Sentry.Handlers.requestHandler());
app.use(Sentry.Handlers.tracingHandler());
app.use(Sentry.Handlers.errorHandler());



app.get('/',(req,res)=>{
    return res.status(200).json({
      message: 'stack_lite API',
    })
  })
app.use(Honeybadger.errorHandler)


app.listen(port, ()=>{
  db_init();
  redis_init();
  ai_init();
  console.log(`server started on port: ${port}`);
})

transaction.finish();



