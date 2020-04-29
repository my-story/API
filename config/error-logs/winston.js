// const winston = require('winston');
// require('winston-mongodb').MongoDB;

// // const levels = { 
// //   error: 0, 
// //   warn: 1, 
// //   info: 2, 
// //   verbose: 3, 
// //   debug: 4, 
// //   silly: 5 
// // };

// let options = { db: process.env.DB, poolSize: 2, autoReconnect: true, useNewUrlParser: true};
// winston.add(new winston.transports.MongoDB(options));

// const winstonLogger = winston.createLogger({
//   format: winston.format.json(),
//   transports:[
//     new (winston.transports.Console),
//     new (winston.transports.MongoDB)({
//       db: process.env.DB,
//       collection: 'admin',
//       storeHost: true,
//       // poolSize: 2,
//       expireAfterSeconds: 2630000,
//       // tryReconnect: true,
//       // options: {
//         poolSize: 2,
//         autoReconnect: true,
//         useNewUrlParser: true,
//       // },
//     })
//   ],
//   exitOnError: true,
// });

// module.exports = winstonLogger;

