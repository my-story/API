const express = require('express');
const router  = express.Router();
const Influencer = require('../models/Influencer')
const uploadCloud = require("../config/cloudinary");
// const security = require('../middlewears/admin.mid')

//middlewears 
// const isAuthenticated = (req, res, next) =>{
//   // do any checks you want to in here

//   // CHECK THE USER STORED IN SESSION FOR A CUSTOM VARIABLE
//   // you can do this however you want with whatever variables you set up
//   if (req.user.authenticated)
//       return next();

//   // IF A USER ISN'T LOGGED IN, THEN REDIRECT THEM SOMEWHERE
//   res.redirect('/');
// }

//Is Admin middlewear
const isAdmin = (req, res, next) => {
  if (!req.user) return res.redirect('/')
  if (req.user.role === 'Admin') return next()
  return res.redirect('/')
}

//Gtet all Influencers in Product Page
router.get('/all',(req,res,next)=>{
  Influencer.find()
  .then((influencer)=>{
    res.status(200).json(influencer)
  })
  .catch((e)=>console.log(e))
})

//Create a Infleuncer for each infleuncer
router.post('/create', (req,res,next)=>{
  Influencer.create({
    "name" : req.body.name,
    "review" : req.body.review,
    "expertise" : req.body.expertise,
    "images" : req.body.images,
  })
  .then((user)=>{
    res.status(201).json(user)
    console.log(user)
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
router.post('/upload-picture',uploadCloud.single('picture'),(req,res,next)=>{
// const id = req.params

Influencer.findByIdAndUpdate(id, {picture : req.file.url}, {new:true})
.then((user)=>{
  res.status(201).json(user)
})
.catch((e)=>next(e))
})

module.exports = router;
