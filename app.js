require('dotenv').config({path: './.env'});
const express = require("express");
const { sequelize } = require('./models');
const index = require("./routers");
const rateLimit = require('express-rate-limit');
const morgan = require('morgan');
const app = express();
const cookieParser = require('cookie-parser');
const aiClient = require('./util/ai_helper')
const redisClient = require('./util/redis_helper')
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/config/config.js')[env];
const Honeybadger = require('./util/logger');
const Sentry = require("@sentry/node");
const Tracing = require("@sentry/tracing");
const { ProfilingIntegration } = require("@sentry/profiling-node")
const worker_pool = require('./worker-pool/init')
const helmet = require('helmet')
const appError = require('./util/app_error')
const controllers = require('./controllers')
const sanitizer = require("perfect-express-sanitizer");
const lusca = require('lusca')
const session = require('express-session')

//Set the number of threads to the number of cores 
process.env.UV_THREADPOOL_SIZE = config.UV_THREADPOOL_SIZE

const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: "Too many requets from this IP,please try again in an hour"
})

app.use(session({
  secret: config.JWT_SECRET,
  resave: true,
  saveUninitialized: true
}));

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


const port = config.app_port;

const db_init = async function main() {
  //await sequelize.sync({ alter: true })
  await sequelize.authenticate()
  console.log("table initialized")
}


//Initialize redis
const redis_init = async () => {
  redisClient.on('error', err => console.error('Redis Client Error', err))
  await redisClient.connect().then(
    console.log('Redis server connected')
  ).catch(err => {
    console.log('Redis initialization failed:', err)
  })


}
//INITIALIZE OPEN AI

const ai_init = async () => {

    const response = await aiClient.listEngines()
    if(response.status === 200){
      console.log('AI engine is up and running!! 🤖🤖🤖🤖')
    } else {
      console.log('Unable to run AI 💥')
    }
  }

app.use(Honeybadger.requestHandler)
app.use(Sentry.Handlers.requestHandler());
app.use(helmet());
app.use(express.json());
app.use(cookieParser());
app.use(lusca.csrf())
app.use('/api', limiter);
app.use('/api/v1/', index);
app.use(Sentry.Handlers.tracingHandler());
app.use(Sentry.Handlers.errorHandler());
app.use(controllers.error);
app.use((req, _res, next) => {
  req.requestTime = new Date().toISOString();
  console.log(req.headers);
  next();
})
app.use(sanitizer.clean({
  xss: true,
  noSql: true,
  sql: true
}));

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
app.get('/',(req,res)=>{
    return res.status(200).json({
      message: 'stack_lite API',
    })
  })

app.all('*', (req, res, next) => {
  next(new appError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(Honeybadger.errorHandler)

;(async () => {
  //Initialize worker pool
  if (config.WORKER_POOL_ENABLED) {
    const options = { minWorkers: 'max' }
    await worker_pool.initialize(options)
  }


  app.listen(port, () => {
    db_init();
    redis_init();
    ai_init();
    console.log(`server started on port: ${port}`);
  });

})()

process.on('beforeExit', () => {
  worker_pool.terminate();
});


transaction.finish();



