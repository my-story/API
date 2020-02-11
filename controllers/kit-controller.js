const Kit = require('../models/Kit');
const winstonLogger = require('../config/error-logs/winston');


module.exports.createKit = (req,res,next) => {
  console.log(req.body.kit)
  Kit.create({
    title: req.body.kit.title,
    influencer: req.body.kit.influencer,
    products: req.body.kit.products,
    tips: req.body.kit.tips,
    techniques: req.body.kit.techniques,
    category: req.body.kit.category,

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
 let {id} = req.params;
 
  Kit.findOne({influencer: id})
    .populate("products.product")
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
  
  Kit.find()
  .populate("product")
    .then((kits) => {
      kits.map((kit) => {
        let products = kit.products;
        products.map((p) => {
          let product = p.product;
        })
      })

    })
    .catch((error) => winstonLogger.error("Couldn't kits for products backed by influencers", {
      metadata:{
        services:"kit-controller: productBackedBy",
        error: error.message
      }
    }))
};

module.exports.updateKit = (req, res, next) => {
  Kit.findByIdAndUpdate( req.params.id, {
      title: req.body.kit.title,
      influencer: req.body.kit.influencer,
      products: req.body.kit.products,
      tips: req.body.kit.tips,
      techniques: req.body.kit.techniques,
      category: req.body.kit.category

  
  })
  .then((kit) => res.status(201).json(kit))
  .catch((error) => winstonLogger.error("Couldn't update Kit", {
    metadata:{
      services:"kit-controller: updateKit",
      error: error.message
    }
  }))
};

module.exports.getKitAdmin = (req, res, next) => {
  let {id} = req.params;
  
   Kit.findById(id)
     .then(kit => res.status(200).json(kit))
     .catch((error) => winstonLogger.error("Couldn't get Kit", {
       metadata:{
         services:"kit-controller: getKit",
         error: error.message
       }
     }))
 };
// module.exports.editKit = (req,res,next) => {
  
// }