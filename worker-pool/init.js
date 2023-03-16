'use strict';

const WorkerPool = require('workerpool');
const Path = require('path');

let poolProxy = null;

// Initialize the worker pool
const initialize = async (options) => {
  const pool = WorkerPool.pool(Path.join(__dirname, './pool_functions.js'), options);
  poolProxy = await pool.proxy();
  console.log(`Worker Threads Enabled With - Min Workers: ${pool.minWorkers} - Max Workers: ${pool.maxWorkers} - Worker Type: ${pool.workerType}`);
};

// Get the proxy to the worker pool
const get_proxy = () => {
  return poolProxy
}

module.exports = { initialize, get_proxy };
