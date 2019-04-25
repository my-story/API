const Product = require('../models/Product')


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
    "images":req.body.images,
    "category": req.body.category,
    "prize": req.body.prize,
    "influencer": req.body.influencer
  })
  .then((p)=>{
    res.status(201).json(p)
  })
  .catch((e)=>next(e))
}

module.exports.addPicture = (req,res,next) =>{
  const id = req.params

Product.findByIdAndUpdate(id, {picture : req.file.url}, {new:true})
.then((user)=>{
  res.status(201).json(user)
})
.catch((e)=>next(e))
}