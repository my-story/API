// const express = require('express');
// const router  = express.Router();

// // const stripe = require('stripe')('sk_test_4eC39HqLyjWDarjtT1zdp7dc');

// // router.post(('/stripe'),(async () => {
// //   const session = await stripe.checkout.sessions.create({
// //     payment_method_types: ['card'],
// //     line_items: [{
// //       name: 'T-shirt',
// //       description: 'Comfortable cotton t-shirt',
// //       images: ['https://example.com/t-shirt.png'],
// //       amount: 500,
// //       currency: 'usd',
// //       quantity: 1,
// //     }],
// //     success_url: 'https://example.com/success',
// //     cancel_url: 'https://example.com/cancel',
// //   });
// // }))();

// module.exports = router;
const express = require('express');
const router  = express.Router();
const stripe = require('../config/constants/stripe');

const postStripeCharge = res => (stripeErr, stripeRes) => {
  if (stripeErr) {
    res.status(500).send({ error: stripeErr });
  } else {
    res.status(200).send({ success: stripeRes });
  }
}

// const paymentApi = app => {
  router.get('/', (req, res) => {
    res.send({ message: 'Hello Stripe checkout server!', timestamp: new Date().toISOString() })
  });

  router.post('/', (req, res) => {
    stripe.charges.create(req.body, postStripeCharge(res));

  });

  // return app;
    // };

  ///This can only be used for Test
  router.post('/paying')
    const order = stripe.orders.create({
      currency: 'usd',
      email: 'jenny.rosen@example.com',
      items: [
        {
          type: 'sku',
          parent: 'sku_F95Ej6Ko5wPWmW',
          quantity: 2,
        },
      ],
      shipping: {
        name: 'Jenny Rosen',
        address: {
          line1: '1234 Main Street',
          city: 'San Francisco',
          state: 'CA',
          postal_code: '94111',
          country: 'US',
        },
      },
    });

module.exports = router;