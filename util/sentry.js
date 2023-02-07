const env = process.env.NODE_ENV || 'development';
const config = require(`${__dirname}/../config/config.js`)[env];
const Sentry = require("@sentry/node");
const Tracing = require("@sentry/tracing");
const express = require("express");
const app = express();
const { ProfilingIntegration } = require("@sentry/profiling-node")

sentry_init = function () {
    Sentry.init({
        dsn: config.SENTRY_URL,
        integrations: [
            new ProfilingIntegration(),
            new Sentry.Integrations.Http({ tracing: true }),
            new Tracing.Integrations.Express({
                app, tracing: true
            }),
        ],
        profilesSampleRate: 1.0,
        tracesSampleRate: 1.0,
    })
    console.log('Sentry initialized');
    ;
}

module.exports = sentry_init
