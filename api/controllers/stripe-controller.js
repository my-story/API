const stripe = require("stripe")(process.env.sk_test_MY_SECRET_KEY);
const winstonLogger = require('../config/error-logs/winston');

module.exports.charge = (req,res) => {
  let status = stripe.charges.create({
    amount: req.body.total,
    currency: "usd",
    description: "An example charge",
    source: req.body.token,
    })
      .then((response) => res.json({response}))
      .catch((error) => winstonLogger.error("Couldn't charge customer", {
        metadata:{
          services:"stripe-controller: charge",
          error: error
        }
      }))
};