const winston = require('winston');
const winstonMongoDB = require('winston-mongodb').MongoDB;

const levels = { 
  error: 0, 
  warn: 1, 
  info: 2, 
  verbose: 3, 
  debug: 4, 
  silly: 5 
};

const logger = winston.createLogger({
  format: winston.format.json(),
  transports:[
    new (winston.transports.Console),
    new (winston.transports.MongoDB)({
      db: process.env.DB,
      collection: 'error-logs',
      storeHost: true,
    })
  ],
  json: true,
  exitOnError: false,
});

module.exports = logger

