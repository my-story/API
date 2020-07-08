const Email = require('../models/Email');
// const winstonLogger = require('../config/error-logs/winston');

module.exports.addEmail = (req,res,next)=> {

  const email = req.body.email;
  console.log(req.body)
  Email.findOne({ email: email}, (err, email) => {
    if (err){
      res.json( {error: `Add email not working`})
    } else if (email){
      res.json( {error: `Sorry, already a user with the email: ${email.email}`})
    } else {
      Email.create({
        email: req.body.email,
        name: req.body.name
      })
        .then((email) => res.status(201).json(email))
        .catch((error) => console.log(error)); 
    }
  })
}

module.exports.addSubscriber = (req,res,next)=> {

  const email = req.body;
  console.log(req.body)

  Email.findOne({ email: email}, (err, email) => {
    if (err){
      res.json( {error: `Add email not working`})
    } else if (email){
      res.json( {error: `Sorry, already a user with the email: ${email.email}`})
    } else {
      Email.create({
        email: req.body.email,
        name: req.body.name
      })
        .then((email) => console.log(email))
        .catch((error) => console.log(error)); 
    }
  })
}