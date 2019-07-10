const Influencer = require('../models/Influencer');

module.exports.getAll = (req,res) => {
  Influencer.find()
  .then((influencer) => res.status(200).json(influencer))
  .catch((error) => {
    winstonLogger.info('Influencer All' , {
      "error" : error,
    })
  })
};

module.exports.filterButton = (req,res) => {
  const {search} = req.query;
  Influencer.find({expertise:search})
    .then((influencer) => res.status(200).json(influencer))
    .catch((error) => {
      winstonLogger.info('Filter Categories Button Influencer' , {
        "error" : error
      })
    })
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
    .catch((error) => {
      winstonLogger.info('Filter Search Bar Influencer' , {
        "error" : error,
      })
    });
};

module.exports.profile = (req,res) => {
  const id = req.params.id;
  Influencer.findOne({_id: id})
    .then(influencer => res.status(201).json(influencer))
    .catch((e) => console.log(e))
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
    .catch((e)=>console.log(e))
};

module.exports.addReward = (req,res) => {
  Influencer.findByIdAndUpdate(req.params.id, {
    "reward":req.body.reward
    })
    .then((influencer) => res.status(201).json(influencer))
    .catch((e)=> console.log(e))
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
    .catch((e) => console.log(e))
};

module.exports.delete = (req,res) => {
  Influencer.findByIdAndDelete({_id: req.params.id})
  .then((influencer) => res.status(201).json(influencer))
  .catch((err) => next(err))
}