const Influencer = require('../models/Influencer');
const winstonLogger = require('../config/error-logs/winston');

module.exports.getAll = (req,res) => {
  Influencer.find()
  .then((influencer) => res.status(200).json(influencer))
  .catch((error) => winstonLogger.warn("Couldn't get all Influencers", {
    metadata:{
      services:"influencer-controller: getAll",
      error: error
    }
  }));
};

module.exports.filterButton = (req,res) => {
  const {search} = req.query;
  Influencer.find({expertise:search})
    .then((influencer) => res.status(200).json(influencer))
    .catch((error) => winstonLogger.info("Couldn't filter the category of Influencers", {
      metadata:{
        services:"influencer-controller: filterButton",
        error: error
      }
    }));
};

module.exports.filterSearch = (req,res) => {
  const {search} = req.query 
  Influencer.find({
    $or:[
      {"name.firstName": {$regex:search, $options:'i'}},
      {"name.lastName": {$regex:search, $options:'i'}},
      {expertise:  {$regex:search, $options:'i'}},
      {review:  {$regex:search,$options:'i'}},
    ]
  })
    .then((influencer) => res.status(200).json(influencer))
    .catch((error) => winstonLogger.info("Couldn't filter Influencers", {
      metadata:{
        services:"influencer-controller: filterSearch",
        error: error
      }
    }));
};

module.exports.profile = (req,res) => {
  const id = req.params.id;
  Influencer.findOne({_id: id})
    .then(influencer => res.status(201).json(influencer))
    .catch((error) => winstonLogger.warn("Couldn't get Influencer profile", {
      metadata:{
        services:"influencer-controller: profile",
        error: error
      }
    }));
};

module.exports.create = (req,res) => {
  Influencer.create({
    "name.firstName" : req.body.firstname,
    "name.lastName" : req.body.lastname,
    "review" : req.body.review,
    "expertise" : req.body.expertise,
    "percentage" : req.body.percentage,
    "images" : req.body.images,
  })
    .then((influencer) => res.status(201).json(influencer))
    .catch((error) => winstonLogger.info("Couldn't create Influencer", {
      metadata:{
        services:"influencer-controller: create",
        error: error
      }
    }));
};

module.exports.addReward = (req,res) => {
  Influencer.findByIdAndUpdate(req.params.id, {
    "reward":req.body.reward
    })
    .then((influencer) => res.status(201).json(influencer))
    .catch((error) => winstonLogger.error("Couldn't add Influencer reward", {
      metadata:{
        services:"influencer-controller: addReward",
        error: error
      }
    }));
};

module.exports.edit = (req,res) => {
  Influencer.findByIdAndUpdate(req.params.id, {
    "name.firstName":req.body.firstName,
    "name.lastName":req.body.lastName,
    "profilePic": req.body.image,
    "review": req.body.review,
    "expertise": req.body.expertise,
    "percentage": req.body.percentage
  })
    .then((influencer) => res.status(201).json(influencer))
    .catch((error) => winstonLogger.verbose("Couldn't edit Influencer", {
      metadata:{
        services:"influencer-controller: edit",
        error: error
      }
    }));
};

module.exports.delete = (req,res) => {
  Influencer.findByIdAndDelete({_id: req.params.id})
  .then((influencer) => res.status(201).json(influencer))
  .catch((error) => winstonLogger.verbose("Couldn't delete Influencer", {
    metadata:{
      services:"influencer-controller: delete",
      error: error
    }
  }));
}