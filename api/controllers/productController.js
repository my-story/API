const Product = require('../models/Product')


module.exports.getAll = (req,res,next)=>{
  Product.find()
  .then((p)=>{
    res.status(200).json(p)
  })
  .catch()
}

module.exports.createProduct = (req,res,next)=>{
  Product.create(req.body)
  .then((p)=>{
    res.status(201).json(p)
  })
  .catch((e)=>next(e))
}