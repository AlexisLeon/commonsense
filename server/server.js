/* eslint-disable no-console */
process.env.NODE_PATH = __dirname;
require('module').Module._initPaths();
process.title = 'CommonSense API Service';
global.__base = __dirname;
global.__app = __dirname + '/src/';
process.env.TZ = 'America/Mexico_City';

const express = require('express');
const Raven = require('raven');
const conf = require('./src/config');
const helmet = require('helmet');
const expressValidator = require('express-validator');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const compression = require('compression');

const middleware = require('./src/controllers/middleware');

const environment = process.env.NODE_ENV || conf.get('app:environment');
const isProduction = environment === 'production' || environment === 'stage';

const app = express();
Raven.config(
  `https://${conf.get('sentry:key')}:${conf.get('sentry:secret')}@sentry.io/${conf.get('sentry:project')}`,
  {
    shouldSendCallback: () => isProduction,
  },
).install();

// CONFIGURE APP
app.use(Raven.requestHandler());
app.use(morgan(conf.get('app:log')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(compression()); // compression middleware
app.use(methodOverride()); // HTTP verbs (PUT, DELETE, ...)
app.use(helmet()); // implements 6 measures for security headers
app.use(expressValidator());
// app.use(log4js.connectLogger(log4js.getLogger("http"), { level: 'auto' }));
app.use((req, res, next) => {
  const apiHost = conf.get('app:host');
  const apiPort = conf.get('app:port');
  const port = (apiPort === '80' ? '' : (`:${apiPort}`));

  if (!isProduction) console.log('Request: ', req.body);

  res.header('Access-Control-Allow-Origin', '*'); // `${apiHost}:${port}`);
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.header('Access-Control-Allow-Credentials', 'true');

  next();
});

// CONFIGURE DATABASE
require('./src/init/db');

// HANDLE ERRORS
process.on('uncaughtException', (error) => {
  console.log(error.stack);
});

app.use('/', require('./src/routes/routes'));
app.use('/v1', require('./src/routes/api'));

app.use(middleware.responseHandler);
app.use(middleware.notFoundHandler);
app.use(middleware.logErrors);
app.use(middleware.errorHandler);
app.use(Raven.errorHandler());

if (environment !== 'test') {
  app.listen(conf.get('app:port'), () => {
    console.log(`App started at port: ${conf.get('app:port')}`);
  });
}

module.exports = app;
