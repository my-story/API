const express = require('express');
const router  = express.Router();
const InfluencerReward = require('../models/InfluencerReward');


//Get all InfluencerRewards in Product Page
router.get('/all',(req,res,next)=>{
  InfluencerReward.find()
  .then((user)=>{
    res.status(200).json(user)
  })
  .catch()
})

//get just one Influencer Reward

router.get('/getOne/:id', (req,res,next) => {
  InfluencerReward.findOne({influencer: req.params.id})
    .then(infuencerReward => res.json(infuencerReward))
    .catch(next)
})

//Create a Product for each infleuncer
router.post('/create',(req,res,next)=>{
  InfluencerReward.create(req.body)
  .then((user)=>{
    res.status(201).json(user)
  })
  .catch((e)=>next(e))
})

module.exports = router;
