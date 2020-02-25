const Product = require('../models/Product');
const winstonLogger = require('../config/error-logs/winston');

module.exports.getAll = (req,res,next)=> {
  Product.find()
    .populate("influencer")
    .then((product) => res.status(200).json(product))
    .catch((error) => winstonLogger.info("Couldn't get all products", {
      metadata:{
        services:"product-controller: getAll",
        error: error.message
      }
    })) 
};

// module.exports.getOneSurvival = (req, res, next) => {
// console.log(req.body)
//   Product.findById(req.body)
//     .populate("influencer")
//     .then((product)=> res.json(product))
//     .catch((error) => winstonLogger.info("Couldn't get one product", {
//       metadata:{
//         services:"product-controller: getOneSurvival",
//         error: error.message
//       }
//     })) 
// };

module.exports.getOne = (req, res, next) => {

  Product.findById(req.params.id)
    .populate("influencer")
    .then((product)=> res.json(product))
    .catch((error) => winstonLogger.info("Couldn't get one product", {
      metadata:{
        services:"product-controller: getOne",
        error: error.message
      }
    })) 
};

module.exports.getOneAdmin = (req, res) => {
  Product.find({influencer: req.params.id}, {model: 1})
    .then((product) => res.json(product))
    .catch((error) => winstonLogger.info("Couldn't get one product for admin panel", {
      metadata:{
        services:"product-controller: getOneAdmin",
        error: error.message
      }
    })) 
}


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
        error: error.message
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
    total: req.body.total
  })
    .then((product) => res.status(201).json(product))
    .catch((error) => winstonLogger.info("Couldn't create Product", {
      metadata:{
        services:"product-controller: createProduct",
        error: error.message
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
      error: error.message
    }
  }));
}

module.exports.filterPrizeDecending = (req, res, next) => {
  Product.find().sort( {prize: -1} )
  .populate("influencer")
  .then((products)=> res.status(200).json(products))
  .catch((error) => winstonLogger.debug("Couldn't filter products by price", {
    metadata:{
      services:"product-controller: filterPrizeDecending",
      error: error.message
    }
  }));
}

module.exports.filterPrizeAcending = (req, res, next) => {
  Product.find().sort( {prize: 1} )
  .populate("influencer")
  .then((products)=> res.status(200).json(products))
  .catch((error) => winstonLogger.debug("Couldn't filter products by price", {
    metadata:{
      services:"product-controller: filterPrizeDecending",
      error: error.message
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
        error: error.message
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
        error: error.message
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
        error: error.message
      }
    }));
};

