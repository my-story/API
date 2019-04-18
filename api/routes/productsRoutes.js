const express = require('express');
const router  = express.Router();
const Product = require('../models/Product')


//Gtet all Products in Product Page
router.get('/all',(req,res,next)=>{
  Product.find()
  .then((p)=>{
    res.status(200).json(p)
  })
  .catch()
})

//Create a Product for each infleuncer
router.post('/create',(req,res,next)=>{
  Product.create(req.body)
  .then((p)=>{
    res.status(201).json(p)
  })
  .catch((e)=>next(e))
})

module.exports = router;
