const Kit = require('../models/Kit');
const winstonLogger = require('../config/error-logs/winston');

module.exports.createKit = (req,res,next) => {
  Kit.create({
    influencer: req.body.influencer,
    products: req.body.products,
    tips: req.body.tips,
    techniques: req.body.techniques,
    category: req.body.category[0],

  })
  .then((kit) => {
    console.log(kit)
    res.status(200).json(kit)
  })
  .catch((error) => winstonLogger.error("Couldn't create Kit", {
    metadata:{
      services:"kit-controller: createKit",
      error: error.message
    }
  }))
};

module.exports.getKit = (req, res, next) => {
 const {id} = req.params;
//  console.log(id);

  Kit.find({influencer: id})
  .then(kit => res.status(200).json(kit))
  .catch((error) => winstonLogger.error("Couldn't get Kit", {
    metadata:{
      services:"kit-controller: getKit",
      error: error.message
    }
  }))
};

module.exports.productBackedBy = (req, res, next ) => {
  const {id} = req.params;
  // return id;
  // {"products.product":"5d547d66753fb60cb0ff0968"}
  console.log(req.params.id)
  
  Kit.find({
      products: [{ 
        product: id 
      }]
    })
    .then((kits) => console.log(kits), res.status(200).json(kits))
    .catch((error) => winstonLogger.error("Couldn't kits for products backed by influencers", {
      metadata:{
        services:"kit-controller: productBackedBy",
        error: error.message
      }
    }))
};

// module.exports.editKit = (req,res,next) => {
  
// }