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
     
    } else {
        console.log('good');
      
    }
})



})


// router.post('/contact', (req, res, next) => {
//   let name = req.body.name
//   let email = req.body.email
//   // let message = req.body.message
  
//   // let content = `name: ${name} \n email: ${email} \n message: ${content} `

//   let mail = {
//     from: name,
//     to: email,  //Change to email address that you want to receive messages on
//     subject: 'Thank you for contacting us!',
//     text: `Thank you for buying!`
//   };

//   let mail2 = {
//     from: name,
//     to: "sebasgrossmann@gmail.com",
//     subject: "A customer bought a Product!",
//     text: "Go into the website to ship product"
//   };

//   transporter.sendMail(mail, (err, data) => {
//     if (err) {
//       res.json({
//         msg: 'fail'
//       })
//     } else {
//       transporter.sendMail(mail2, (err,data) => {x})
//       res.json({
//         msg: 'success'
//       })
//     }
//   });
// });

module.exports = router;

