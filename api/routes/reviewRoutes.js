
const express    = require('express');
const router     = express.Router();
const Review   = require('../models/Review');
const uploadCloud = require("../config/cloudinary");
const middlewares = require("../middlewears/secure.mid");


let test = {}

router.get('/specific/:id', (req, res, next) =>{
    let {id} = req.params

    Review.find({influencer: id})//.findById(req.params.restID)
        .populate('influencer')
        .then((re) =>{
            console.log(re)
            res.json(re)
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


router.post('/new', middlewares.isAdmin, (req, res, next) =>{
    Review.create(req.body)
        .then((response) =>{
            test = response._id
            console.log(req.body)
            res.json(response)
        })
        .catch((err) =>{
            res.json(err);
        })
})




router.post('/edit/:id', middlewares.isAdmin, (req, res, next) =>{
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
