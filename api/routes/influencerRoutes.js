const express = require('express');
const router  = express.Router();
const uploadCloud = require("../config/cloudinary");
const middleweares = require("../middlewears/secure.mid");
const Influencer = require('../models/Influencer')

//Get all Influencers in Product Page
router.get('/all', (req,res,next) => {
  Influencer.find()
    .then((influencer) => res.status(200).json(influencer))
    .catch((e)=>console.log(e))
});

// Filter categories
router.get("/filter/category", (req, res, next) => {
  const {search} = req.query;
  Influencer.find({
    $or:[
    {expertise:{$regex:search, $options:'i'}}
    ]
  })
    .then((influencer) => res.status(200).json(influencer))
    .catch((e) => console.log(e))
});

router.get("/:id", (req,res,next) => {
  const id = req.params.id;
  Influencer.findOne({_id: id})
    .then(influencer => res.status(201).json(influencer))
    .catch((e) => console.log(e))
});

//Create a Influencer for each influencer
router.post('/create', middleweares.isAdmin, (req,res,next) => {
  Influencer.create({
    "name" : req.body.name,
    "review" : req.body.review,
    "expertise" : req.body.expertise,
    "percentage" : req.body.percentage,
    "images" : req.body.images,
  })
    .then((influencer) => res.status(201).json(influencer))
    .catch((e)=>console.log(e))
});

//ADD Reward
router.post('/reward/:id', (req,res,next) => {
Influencer.findByIdAndUpdate(req.params.id, {
  "reward":req.body.reward
  })
  .then((influencer) => res.status(201).json(influencer))
  .catch((e)=> console.log(e))
});

//Update a INfluencer for each infleuncer
router.post('/edit/:id', middleweares.isAdmin, (req,res,next) => {

  Influencer.findByIdAndUpdate(req.params.id, {
    "name":req.body.name,
    "profilePic": req.body.image,
    "review": req.body.review,
    "expertise": req.body.expertise,
    "percentage": req.body.percentage
  })
    .then((influencer) => res.status(201).json(influencer))
    .catch((e)=>console.log(e))
});

//filtro influencer

router.get('/filter', (req,res) => {
  const {search} = req.query;

  Influencer.find({
    $or:[
      {name:{$regex:search, $options:'i'}}
      // {expertise:  {$regex:search, $options:'i'}},
      // {review:  {$regex:search,$options:'i'}},
    ]
  })

  // .populate("influencer")
  .then((result)=>{
    console.log(result);
    res.status(200).json(result);
  })
  .catch((e)=>{
    console.log(e)
    res.json(e)
  })
})



router.post("/delete/:id", middleweares.isAdmin, (req, res, next) => {
  Influencer.findByIdAndDelete({_id: req.params.id})
    .then((influencer) => res.status(201).json(influencer))
    .catch((err) => next(err))
});

module.exports = router;
