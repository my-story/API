const winstonLogger = require('../config/error-logs/winston');
const Podcast = require('../models/Podcast');

module.exports.getAll = (req,res,next)=> {
    Podcast.find()
    .populate("influencer")
    .then((podcasts) => res.status(200).json(podcasts))
    .catch((error) => winstonLogger.info("Couldn't get all products", {
        metadata:{
        services:"podcast-controller: getAll",
        error: error.message
        }
    })) 
};

module.exports.create = (req,res,next)=> {

    Podcast.create({
        "influencer": req.body.podcast.influencer,
        "title": req.body.podcast.title,
        "video": req.body.podcast.video,
        "audio": req.body.podcast.audio,
        "description": req.body.podcast.description,
        "image": req.body.podcast.image,
        "time": req.body.podcast.time
    })
    .then((podcast) => res.status(201).json(podcast))
    .catch((error) => winstonLogger.info("Couldn't create Product", {
        metadata:{
        services:"podcast-controller: createPodcast",
        error: error.message
        }
    })); 
};

module.exports.getOne = (req, res, next) => {
    Podcast.findById(req.params.id)
    .then((podcast)=> res.json(podcast))
    .catch((error) => winstonLogger.info("Couldn't get one product", {
        metadata:{
        services:"podcast-controller: getOne",
        error: error.message
        }
    })) 
};

module.exports.edit = (req, res, next) => {
    Podcast.findByIdAndUpdate(req.params.id, {
        "influencer": req.body.influencer,
        "title": req.body.title,
        "video": req.body.video,
        "audio": req.body.audio,
        "description": req.body.description,
        "image": req.body.image,
        "time": req.body.time
        })
    .then((podcast) => res.status(201).json(podcast))
    .catch((error) => winstonLogger.info("Couldn't edit podcast", {
        metadata:{
            services:"podcast-controller: edit",
            error: error.message
        }
    }));
};