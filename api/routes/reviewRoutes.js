const express    = require('express');
const router     = express.Router();
const Review   = require('../models/Review');

router.get('/all', (req, res, next) =>{
    console.log('in reviews',req.user, req.params)

    Review.find({})//.findById(req.params.restID)
        .then((reviews) =>{
            console.log(reviews)
            console.log('in here ')
            res.json({reviews})
            //res.json({ allCustomers: customersForThisRest})
    })
    .catch((err) =>{
        res.json(err);
    })
})

router.get('/details/:id', (req, res, next) =>{
    Review.findById(req.params.id)
    .then((theReview)=>{
        res.json(theReview)
    })
    .catch((err) =>{
        res.json(err);
    })
})


router.post('/new', (req, res, next) =>{
    console.log(req.user, req.params)
    Review.create(req.body)
    .then((response) =>{
        res.json(response)
    })
    .catch((err) =>{
        res.json(err);
    })
})

router.post('/edit/:id', (req, res, next) =>{
    // console.log('reqs',req.params, req.body, req.user)
    Review.findByIdAndUpdate(req.params.id,{
      title: req.body.title,
      review: req.body.review,
      video: req.body.video,
      voicenote: req.body.voicenote
    })
    .then((review)=>{
        console.log(review);
        res.status(201).json(review);
    })
    .catch((err)=>{
        res.json(err)
    })
})

module.exports = router;
