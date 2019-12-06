const Kit = require('../models/Kit');
const winstonLogger = require('../config/error-logs/winston');

module.exports.createKit = (req,res,next) => {
  Kit.create({
    influencer: req.body.influencer,
    products: req.body.products,
    tips: req.body.tips,
    role: req.body.role
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

module.exports.getKit = (req, res, next) => {
  Kit.find({influencer: req.body.influencer})
  .then(kit => res.status(200).json(kit))
  .catch((error) => winstonLogger.error("Couldn't get Kit", {
    metadata:{
      services:"kit-controller: getKit",
      error: error.message
    }
  }))
};

module.exports.editKit = (req,res,next) => {
  
}