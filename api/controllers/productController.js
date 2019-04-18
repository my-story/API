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

module.exports.addPicture = (req,res,next) =>{
  const id = req.params

Product.findByIdAndUpdate(id, {picture : req.file.url}, {new:true})
.then((user)=>{
  res.status(201).json(user)
})
.catch((e)=>next(e))
}