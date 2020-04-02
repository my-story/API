const Kit = require('../models/Kit');
const Technique = require('../models/Technique');
const Tip = require('../models/Tip');
const SurvivalProduct = require('../models/SurvivalProduct');
const winstonLogger = require('../config/error-logs/winston');


//Get Admin Routes To update by influencer
//Tip
module.exports.getTipAdmin = (req, res) => {
  const {id} = req.params;
  
  Tip.find({influencer: id})
    .then((tip) => {
      res.status(200).json(tip)
    })
    .catch((error) => winstonLogger.error("Couldn't get Tip for admin", {
      metadata:{
        services:"kit-controller: getTipAdmin",
        error: error.message
      }
    }))
};
module.exports.getTipEdit = (req, res) => {
  const {id} = req.params;
  Tip.findById(id)
    .then((tip) => {
      res.status(200).json(tip)
    })
    .catch((error) => winstonLogger.error("Couldn't get Tip for admin", {
      metadata:{
        services:"kit-controller: getTipEdit",
        error: error.message
      }
    }))
};
//Technique
module.exports.getTechniqueAdmin = (req, res) => {
  const {id} = req.params;

  Technique.find({influencer: id})
    .then((technique) => {
      res.status(200).json(technique)
    })
    .catch((error) => winstonLogger.error("Couldn't get technique for admin", {
      metadata:{
        services:"kit-controller: getTechniqueAdmin",
        error: error.message
      }
    }))
};

module.exports.getTechniqueEdit = (req, res) => {
  const {id} = req.params;
  Technique.findById(id)
    .then((technique) => {
      res.status(200).json(technique)
    })
    .catch((error) => winstonLogger.error("Couldn't get Techinque for admin", {
      metadata:{
        services:"kit-controller: getTechniqueEdit",
        error: error.message
      }
    }))
};

//SurvivalProduct
module.exports.getSurvivalProductEdit = (req, res) => {
  const {id} = req.params;
  SurvivalProduct.findById(id)
    .then((product) => {
      res.status(200).json(product)
    })
    .catch((error) => winstonLogger.error("Couldn't get SurvivalProduct for admin", {
      metadata:{
        services:"kit-controller: getSurvivalProductAdmin",
        error: error.message
      }
    }))
};

module.exports.getSurvivalProductAdmin = (req, res) => {
  const {id} = req.params;
  SurvivalProduct.find({influencer: id})
    .then((product) => {
      res.status(200).json(product)
    })
    .catch((error) => winstonLogger.error("Couldn't get SurvivalProduct for admin", {
      metadata:{
        services:"kit-controller: getSurvivalProductAdmin",
        error: error.message
      }
    }))
};

//Get ProductKit
module.exports.getProductSurvival = (req, res, next) => {
  const {id} = req.params;

  SurvivalProduct.findById(id)
    .populate("product")
    .then((product) => {
      res.status(200).json(product)
    })
    .catch((error) => winstonLogger.error("Couldn't get ProductSurvival", {
      metadata:{
        services:"kit-controller: getProductSurvival",
        error: error.message
      }
    }))
};

//Get unassigned Products
module.exports.getUnassignedProducts = (req, res, next) => {
  SurvivalProduct.find({survivalKit: false})
    .then((products) => {
      res.status(200).json(products)
    })
    .catch((error) => winstonLogger.error("Couldn't get Products", {
      metadata:{
        services:"kit-controller: getUnassignedProducts",
        error: error.message
      }
    }))
};

//Update Product Kit
module.exports.updateProduct = (req, res, next) => {
  SurvivalProduct.findByIdAndUpdate(req.params.id, {
    influencer: req.body.influencer,
    product: req.body.product,
    comment: req.body.comment,
    recommendation: req.body.recommendation
  })
    .then((product) => {
      res.status(201).json(product)
    })
    .catch((error) => winstonLogger.error("Couldn't Update Survival Product", {
      metadata:{
        services:"kit-controller: updateProduct",
        error: error.message
      }
    }))
}

//Create Survival Product
module.exports.createSurvivalProduct = (req, res, next) => {
  SurvivalProduct.create(req.body)
    .then((product) => {
      res.status(200).json(product)
    })
    .catch((error) => winstonLogger.error("Couldn't create Product Survival Kit", {
      metadata:{
        services:"kit-controller: createSurvivalProduct",
        error: error.message
      }
    }))
};

//Get unassigned Tips
module.exports.getUnassignedTips = (req, res, next) => {
  Tip.find({survivalKit: false})
    .then((tips) => {
      res.status(200).json(tips)
    })
    .catch((error) => winstonLogger.error("Couldn't get Tips", {
      metadata:{
        services:"kit-controller: getUnassignedTips",
        error: error.message
      }
    }))
};

//Update Survival Tip
module.exports.updateTip = (req, res, next) => {
  Tip.findByIdAndUpdate(req.params.id, {
    influencer: req.body.influencer,
    header: req.body.header,
    description: req.body.description,
    // recommendation: req.body.recommendation
  })
    .then((tip) => res.status(201).json(tip))
    .catch((error) => winstonLogger.error("Couldn't update Tip", {
      metadata:{
        services:"kit-controller: updateTip",
        error: error.message
      }
    }))
};

//Create Survival Tips
module.exports.createSurvivalTips = (req, res, next) => {
  Tip.create(req.body)
    .then((tip) => {
      res.status(200).json(tip)
    })
    .catch((error) => winstonLogger.error("Couldn't create Tip Survival Kit", {
      metadata:{
        services:"kit-controller: createSurvivalTips",
        error: error.message
      }
    }))
};


//Get unassigned Techniques 
module.exports.getUnassignedTechnique = (req, res, next) => {
  Technique.find({survivalKit: false})
    .then((techniques) => {
      res.status(200).json(techniques)
    })
    .catch((error) => winstonLogger.error("Couldn't get Techniques", {
      metadata:{
        services:"kit-controller: getUnassignedTechnique",
        error: error.message
      }
    }))
};

//Create Technique
module.exports.createTechnique = (req, res, next) => {
  console.log(req.body)
  Technique.create(req.body.technique)
    // influencer: req.body.technique.technique.influencer,
    // title: req.body.technique.title,
    // subheading: req.body.technique.subheading,
    // recommendation: req.body.technique.recommendation
  
  .then((techniques) => {
    res.status(200).json(techniques)
  })
  .catch((error) => winstonLogger.error("Couldn't create Technique", {
    metadata:{
      services:"kit-controller: createTechnique",
      error: error.message
    }
  }))
};

//Update Technique
module.exports.updateTechnique = (req, res, next) => {
  Technique.findByIdAndUpdate(req.params.id, {
    influencer: req.body.influencer,
    title: req.body.title,
    subheading: req.body.subheading,
    recommendation: req.body.recommendation,
  })
    .then((technique) => {
      res.status(201).json(technique)
    })
    .catch((error) => winstonLogger.error("Couldn't update Technique", {
      metadata:{
        services:"kit-controller: updateTechnique",
        error: error.message
      }
    }))
};

//Create Kit 
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

//Get kit for profile
module.exports.getKitProfile = (req, res, next) => {
 let {id} = req.params;
 
  Kit.findById(id)
  .populate("influencer")
  .populate("products")
  .populate("tips")
  .populate("techniques")
  .populate("products.product")
    .then(kit => res.status(200).json(kit))
    .catch((error) => winstonLogger.error("Couldn't get Kit", {
      metadata:{
        services:"kit-controller: getKitProfile",
        error: error.message
      }
    }))
};

//Get kit for review
module.exports.getKit = (req, res, next) => {
 const {id} = req.params;
 
  Kit.findOne({influencer: id})
  .populate("influencer")
  .populate("products")
  .populate("tips")
  .populate("techniques")
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

module.exports.getAll = (req,res,next) => {
  Kit.find()
    .populate("influencer")
    .then((kit) => res.status(200).json(kit))
    .catch((error) => console.log(error))
}

