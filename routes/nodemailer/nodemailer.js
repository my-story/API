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

  let mailerConfig = {    
    host: 'smtpout.secureserver.net', 
    secureConnection: true,
    port: 587,
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSW
    },
};
let transporter = nodemailer.createTransport(mailerConfig);

let mailOptions = {
    from: mailerConfig.auth.user,
    to: req.body.email,
    subject: 'Contact Us',
    html: `<h4>We appreciate that you’ve taken the time to write us ${req.body.name}.</h4> <br><p> We’ll get back to you very soon. Your message was: <b> ${req.body.message}</b> </p>`
};


  transporter.sendMail(mailOptions, function (error) {
    if (error) {
        // console.log('error:', error);
        res.status(400).json(error);
     
    } else {
        console.log('good');
        res.status(201).send("sent");
    }
})
return transporter.sendMail(mailOptions);

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
          res.status(400);
       
      } else {
          console.log('good');
          res.status(201);
  
        
      }
  })
  
})


module.exports = router;

