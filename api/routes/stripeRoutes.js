const express = require('express');
const router  = express.Router();
const stripe = require("stripe")("sk_test_Au0wg34od1GC3qgugL3CQQQL00gaI6Hf92");

router.use(require("body-parser").text());

router.post("/charge", (req, res) => {
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
      })
});

module.exports = router;
