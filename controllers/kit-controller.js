const Kit = require('../models/Kit');
const Technique = require('../models/Technique');
const winstonLogger = require('../config/error-logs/winston');

//Create Technique
module.exports.createTechnique = (req, res, next) => {

  Technique.create({
    influencer: req.body.influencer,
    title: req.body.title,
    subheading: req.body.subheading,
    recommendation: req.body.recommendation
  })
  .then((technique) => {
    res.status(200).json(technique)
  })
  .catch((error) => winstonLogger.error("Couldn't create Technique", {
    metadata:{
      services:"kit-controller: createTechnique",
      error: error.message
    }
  }))
};


module.exports.createKit = (req, res, next) => {
  Kit.create({
    title: req.body.kit.title,
    influencer: req.body.kit.influencer,
    products: req.body.kit.products,
    tips: req.body.kit.tips,
    techniques: req.body.kit.techniques,
    category: req.body.kit.category,

  })
  .then((kit) => {
    res.status(200).json(kit)
  })
  .catch((error) => winstonLogger.error("Couldn't create Kit", {
    metadata:{
      services:"kit-controller: createKit",
      error: error.message
    }
  }))
};

//Create Technique 
module.exports.createKit = (req,res,next) => {
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

//Get kit for review
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