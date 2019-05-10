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

module.exports.getOne = (req, res, next) =>{
  Product.findById(req.params.id)
  .then((product)=>{
      res.json(product)
  })
  .catch((err) =>{
      res.json(err);
  })
}

module.exports.createProduct = (req,res,next)=>{
  console.log(req.body)

  Product.create({
    model: req.body.model,
    description: req.body.description,
    // images:req.body.images,
    category: req.body.category,
    prize: req.body.prize,
    // influencer: req.body.influencer
  })
  .then((response)=>{
    test = response._id
    res.status(201).json(response)

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