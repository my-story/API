const express = require('express');
const router  = express.Router();
const Influencer = require('../models/Influencer')


//Gtet all Influencers in Product Page
router.get('/all',(req,res,next)=>{
  Influencer.find()
  .then((user)=>{
    res.status(200).json(user)
  })
  .catch()
})

//Create a Product for each infleuncer
router.post('/create',(req,res,next)=>{
  Influencer.create(req.body)
  .then((user)=>{
    res.status(201).json(user)
  })
  .catch((e)=>next(e))
})

module.exports = router;
