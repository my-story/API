const Product = require('../models/Product');
const winstonLogger = require('../config/error-logs/winston');

module.exports.getAll = (req,res,next)=> {
  Product.find()
    .populate("influencer")
    .then((product) => res.status(200).json(product))
    .catch((error) => winstonLogger.info("Couldn't get all products", {
      metadata:{
        services:"product-controller: getAll",
        error: error
      }
    })) 
};

module.exports.getOne = (req, res, next) => {
  Product.findById(req.params.id)
    .then((product)=> res.json(product))
    .catch((error) => winstonLogger.info("Couldn't get one product", {
      metadata:{
        services:"product-controller: getOne",
        error: error
      }
    })) 
};


module.exports.updateTotal = (req, res, next) => {
  Product.findOneAndUpdate(
    {_id: req.params.id},
    {$inc: {total: - req.body.qty}},
    {new: true}
  )
    .then((product) => res.status(201).json(product))
    .catch((error) => winstonLogger.verbose("Couldn't update total", {
      metadata:{
        services:"product-controller: updateTotal",
        error: error
      }
    })); 
};

module.exports.createProduct = (req,res,next)=> {
  Product.create({
    model: req.body.model,
    description: req.body.description,
    images:req.body.images,
    category: req.body.category,
    prize: req.body.prize,
    influencer: req.body.influencer,
    total: req.body.total
  })
    .then((product) => res.status(201).json(product))
    .catch((error) => winstonLogger.info("Couldn't create Product", {
      metadata:{
        services:"product-controller: createProduct",
        error: error
      }
    })); 
}

module.exports.filter = (req, res, next) => {
  const {search} = req.query
  Product.find({
    $or:[
      {model:{$regex:search, $options:'i'}},
      {description:{$regex:search, $options:'i'}},
      {category:{$regex:search, $options:'i'}}

    ]
  })
  .populate("influencer")
  .then((products)=> res.status(200).json(products))
  .catch((error) => winstonLogger.debug("Couldn't filter products", {
    metadata:{
      services:"product-controller: filter",
      error: error
    }
  }));
}

//Search bar
module.exports.filterCategory = (req, res, next) => {
  const {search} = req.query
  Product.find({
    $or:[
      {category:{$regex:search, $options:'i'}},
      {model:{$regex:search, $options:'i'}},
      {description:{$regex:search, $options:'i'}}

    ]
  })
    .then((product) => res.status(200).json(product))
    .catch((error) => winstonLogger.debug("Couldn't filter category", {
      metadata:{
        services:"product-controller: filterCategory",
        error: error
      }
    }));
}

module.exports.delete = (req, res, next) => {
  const search = req.params.id;
  Product.findOneAndDelete({ influencer: search })
    .then(product => res.status(201).json(product))
    .catch((error) => winstonLogger.debug("Couldn't delete product", {
      metadata:{
        services:"product-controller: delete",
        error: error
      }
    }));
}

module.exports.edit = (req,res, next) => {
  Product.findOneAndUpdate({influencer: req.params.id}, {
    "model": req.body.model,
    "prize": req.body.prize,
    "images": req.body.images,
    "description": req.body.description,
    "category": req.body.category,
    "total": req.body.total
  })
    .then((product) => res.status(201).json(product))
    .catch((error) => winstonLogger.info("Couldn't edit product", {
      metadata:{
        services:"product-controller: edit",
        error: error
      }
    }));
}