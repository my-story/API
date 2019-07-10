const stripe = require("stripe")("sk_test_Au0wg34od1GC3qgugL3CQQQL00gaI6Hf92");

module.exports.charge = (req,res) => {
  let status = stripe.charges.create({
    amount: req.body.total,
    currency: "usd",
    description: "An example charge",
    source: req.body.token,
    })
      .then((response) => res.json({response}))
      .catch((err)=>{
        console.log(err)
        res.status(500).end();
      });
};