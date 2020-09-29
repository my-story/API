const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
// const creds = require('../config/config');

// let transport = {
//   service: 'Gmail',
//   auth: {
//     user: process.env.EMAIL_FOR_APP,
//     pass: process.env.PASSWORD_FOR_EMAIL
//   }
// }

// let transporter = nodemailer.createTransport(transport)

// transporter.verify((error, success) => {
//   if (error) {
//     console.log(error);
//   } else {
//     console.log('Server is ready to take messages');
//   }
// });


router.post('/contact', (req, res) => {
  console.log(req.body.email);

  let mailerConfig = {    
    host: 'smtpout.secureserver.net', 
    secureConnection: true,
    port: 587,
    auth: {
        user: "contact@reboundwithus.com",
        pass: "Philantros100"
    },
    logger: true,
    debug: true, // include SMTP traffic in the logs
};
let transporter = nodemailer.createTransport(mailerConfig);

let mailOptions = {
    from: mailerConfig.auth.user,
    to: req.body.email,
    subject: 'hellooooo',
    html: `${req.body.name} saes ${req.body.message}`
};


  transporter.sendMail(mailOptions, function (error) {
    if (error) {
        console.log('error:', error);
        res.status(400).json(err);
     
    } else {
        console.log('good');
        res.status(201);

      
    }
})

})


router.post('/feedback', (req, res) => {
    console.log("Este es el n=body", req.body.message)
  
    let mailerConfig = {    
      host: 'smtpout.secureserver.net', 
      secureConnection: true,
      port: 587,
      auth: {
          user: "contact@reboundwithus.com",
          pass: "Philantros100"
      },
      logger: true,
      debug: true, // include SMTP traffic in the logs
  };
  let transporter = nodemailer.createTransport(mailerConfig);
  
  let mailOptions = {
      from: mailerConfig.auth.user,
      to: "reboundtalks@gmail.com",
      subject: 'Feedback',
      html: `${req.body.message}`
  };
  
  
    transporter.sendMail(mailOptions, function (error) {
      if (error) {
          console.log('error:', error);
       
      } else {
          console.log('good');
          res.status(201);
  
        
      }
  })
  
})

module.exports = router;

