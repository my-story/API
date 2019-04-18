const express = require('express');
const router  = express.Router();
const Influencer = require('../models/Influencer')
const multer = require("multer");
const uploadCloud = require("../config/cloudinary");
// const security = require('../middlewears/admin.mid')

//middlewears 
const isAuthenticated = (req, res, next) =>{
  // do any checks you want to in here

  // CHECK THE USER STORED IN SESSION FOR A CUSTOM VARIABLE
  // you can do this however you want with whatever variables you set up
  if (req.user.authenticated)
      return next();

  // IF A USER ISN'T LOGGED IN, THEN REDIRECT THEM SOMEWHERE
  res.redirect('/');
}

// const isAdmin = (req,res,next)=> {
    

//   // if(req.headers)return res.redirect('/login')
//   console.log("this is req", req.headers)

//   // console.log("this is req.user", user)

//   // if(req.user.admin) return next()
//   // return res.redirect('/influencer/all')
// }

//Gtet all Influencers in Product Page
router.get('/all',(req,res,next)=>{
  Influencer.find()
  .then((user)=>{
    res.status(200).json(user)
  })
  .catch((e)=>console.log(e))
})

//Create a Infleuncer for each infleuncer
router.post('/create',(req,res,next)=>{
  Influencer.create(req.body)
  .then((user)=>{
    res.status(201).json(user)
  })
  .catch((e)=>console.log(e))
})

//Update a INfluencer for each infleuncer
router.post('/edit/:id',(req,res,next)=>{

  Influencer.findByIdAndUpdate(req.params.id, {
    name:req.body.name,
    // picture: req.body.picture,
    description: req.body.description,
    // category: req.body.category,
  })
  .then((user)=>{
    res.status(201).json(user)
  })
  .catch((e)=>console.log(e))
})

//Add pictures 
router.post('/upload-picture/:id',uploadCloud.single('picture'),(req,res,next)=>{
const id = req.params

Influencer.findByIdAndUpdate(id, {picture : req.file.url}, {new:true})
.then((user)=>{
  res.status(201).json(user)
})
.catch((e)=>next(e))
})

module.exports = router;
