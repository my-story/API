
const express    = require('express');
const router     = express.Router();
const Review   = require('../models/Review');
const uploadCloud = require("../config/cloudinary");
const createError = require('http-errors');

isAdmin = (req, res, next) => {
  if (req.user.role === "Admin") {
    return next();
  } else {
    next(createError(403));
  }
}


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


router.post('/new', isAdmin, (req, res, next) =>{
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


router.post('/upload/voicenote',uploadCloud.single('voicenote'),(req,res,next)=>{

    Review.findByIdAndUpdate(test,{voicenote : req.file.url}, {new:true})
    .then((review)=>{
        console.log(review)
      res.status(201).json(review)
    })
    .catch((e)=>{
        console.log("es el storage" + e.storage)
    next(e)})
    })

module.exports = router;
