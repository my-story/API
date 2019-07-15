const winston = require('winston');
require('winston-mongodb').MongoDB;

// const levels = { 
//   error: 0, 
//   warn: 1, 
//   info: 2, 
//   verbose: 3, 
//   debug: 4, 
//   silly: 5 
// };

// winston.add(new winston.transports.MongoDB(options));

const winstonLogger = winston.createLogger({
  format: winston.format.json(),
  transports:[
    new (winston.transports.Console),
    new (winston.transports.MongoDB)({
      db: process.env.DB,
      collection: 'error-logs',
      storeHost: true,
      expireAfterSeconds: 2630000,
      tryReconnect: true
    })
  ],
  exitOnError: false,
});

module.exports = winstonLogger

