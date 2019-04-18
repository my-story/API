const express = require('express');
const router  = express.Router();
const Influencer = require('../models/Influencer')
// const security = require('../middlewears/admin.mid')

//middlewears 
const isAdmin = (req,res,next)=> {
    

  // if(req.headers)return res.redirect('/login')
  console.log("this is req", req.headers)

  // console.log("this is req.user", user)

  // if(req.user.admin) return next()
  // return res.redirect('/influencer/all')
}
//Gtet all Influencers in Product Page
router.get('/all',(req,res,next)=>{
  Influencer.find()
  .then((user)=>{
    res.status(200).json(user)
  })
  .catch((e)=>console.log(e))
})

//Create a Product for each infleuncer
router.post('/create',isAdmin,(req,res,next)=>{
  Influencer.create(req.body)
  .then((user)=>{
    res.status(201).json(user)
  })
  .catch((e)=>console.log(e))
})

module.exports = router;
