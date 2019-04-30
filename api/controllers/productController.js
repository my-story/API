const Product = require('../models/Product')

let test = {}

module.exports.getAll = (req,res,next)=>{
  Product.find()
  .populate('influencer')
  .then((p)=>{
    res.status(200).json(p)
  })
  .catch()
}

module.exports.createProduct = (req,res,next)=>{

  Product.create({
    "model": req.body.model,
    "description": req.body.description,
    // "images":req.body.images,
    "category": req.body.category,
    "prize": req.body.prize,
    "influencer": req.body.influencer
  })
  .then((p)=>{
    // console.log(p._id)
    test = p._id
    res.status(201).json(p)
    // Product.findByIdAndUpdate(p._id,
    //   {picture: req.profilePic.data})
    // .then( product => {
    //   // console.log(product)
    //   res.status(200).json({ message: "Product succesfully updated", picture: req.file.url })
    // })
  })
  .catch((e)=>next(e))
}

module.exports.addPicture = (req,res,next) =>{

Product.findByIdAndUpdate(test, {images : req.file.url})
.then((product)=>{
  res.status(201).json(product)
})
.catch((e)=>next(e))
}