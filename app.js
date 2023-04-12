// Importing the dependencies, packages and modules
require('dotenv').config({ path: './.env' });
const express = require("express");
const { sequelize } = require('./models');
const index = require("./routers");
//const sharp = require('sharp')
const rateLimit = require('express-rate-limit');
const morgan = require('morgan');
const app = express();
const aiClient = require('./util/ai_helper')
const redisClient = require('./util/redis_helper')
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/config/config.js')[env];
const Honeybadger = require('./util/logger');
const Sentry = require("@sentry/node");
const Tracing = require("@sentry/tracing");
// const { ProfilingIntegration } = require("@sentry/profiling-node")
const worker_pool = require('./worker-pool/init')
const helmet = require('helmet')
const controllers = require('./controllers')
const sanitizer = require("perfect-express-sanitizer");
//const middleware = require("./middleware")

// Starting a transaction for tracing the time taken to initialize the server
const transaction = Sentry.startTransaction({
  op: "App.js",
  name: "Server Initialization",
});

// Set the number of threads to equal the number of cores 
process.env.UV_THREADPOOL_SIZE = config.UV_THREADPOOL_SIZE

// Set up rate limit on our APIs
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: "Too many requests from this IP, please try again in an hour"
})

// Initialize Sentry and its profiling and tracing integrations 
Sentry.init({
  dsn: process.env.SENTRY_URL,
  integrations: [
    //new ProfilingIntegration(),
    new Sentry.Integrations.Http({ tracing: true }),
    new Tracing.Integrations.Express({ app, }),
  ],
  profilesSampleRate: 1.0,
  tracesSampleRate: 1.0,
})

//  add requestTime to req object which indicates when the request was made
app.use((req, _res, next) => {
  req.requestTime = new Date().toISOString();
  console.log(req.method, req.originalUrl)
  next();
})

// Adding middleware functions from Honeybadger and Sentry 
app.use(Honeybadger.requestHandler)
app.use(Sentry.Handlers.requestHandler());
app.use(helmet());     // Improve security by adding HTTP headers 
app.use(express.json());   //  parse json data(body)
//app.use(middleware.uploadStrategy)
app.use('/api', limiter);  // implementing rate limiter middleware
app.get('/', (_req, res) => { // GET request at endpoint '/'
  return res.status(200).json({
    message: 'stack_lite API',
  })
})

app.use('/api/v1/', index);
app.all('*', (req, res) => {
  res.status(400).json({
    status: 'fail',
    message: `Can't find (${req.method}) ${req.originalUrl} on this server`
  })

});
app.use(Sentry.Handlers.tracingHandler());
app.use(Sentry.Handlers.errorHandler());

// Use error handler
app.use(controllers.error);

// sanitize input data and thus improving security
app.use(sanitizer.clean({
  xss: true,
  noSql: true,
  sql: true
}));

// Use morgan in dev environment
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Add Honeybadger's errorHandler  middleware 
app.use(Honeybadger.errorHandler)

// create a async function to initialize database
const initDB = async () => {
  await sequelize.authenticate().catch(err => {
    console.log(err)
  })
  console.log("table initialized")
}

// create a async function to initialize redis client
const initRedis = async () => {
  await redisClient.connect()
    .then(() => console.log('Redis server connected'))
    .catch(err => console.log('Redis initialization failed:', err));

  redisClient.on('error', (err) => {
    console.log("Redis Timedout and reconnecting", err);
  })
}

// create a async function to initialize openAi client
const initAI = async () => {
  const response = await aiClient.listEngines()
  if (response.status === 200) {
    console.log('AI engine is up and running!! 🤖🤖🤖🤖')
  } else {
    console.log('Unable to run AI 💥')
  }
}

// IIFE function - Immediately Invoked Function Expression
(async () => {
  // check whether worker pool is enabled or not
  if (config.WORKER_POOL_ENABLED) {
    const options = { minWorkers: 'max' }
    // Initializing the Worker Pool module
    await worker_pool.initialize(options)
  }
  // Utilities setup
  await Promise.all([
    initDB(),
    initRedis(),
    initAI(),
  ])
  //
  // Set the constant variable port to the value of app_port in config
  const port = config.app_port;

// Start listening for incoming connections on specified port and log to console when server has started
  app.listen(port, () => {
    console.log(`server started on port: ${port}`);
  });

// close workers before node process exits
process.on('beforeExit', () => {
  worker_pool.terminate();
});

})();

// Finish Sentry transaction
transaction.finish();