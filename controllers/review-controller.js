const Review = require('../models/Review');
const mongoose = require('mongoose');
const winstonLogger = require('../config/error-logs/winston');

module.exports.getOne = (req, res) => {
	let {id} = req.params
  Review.findOne({influencer: id}) //.findById(req.params.restID)
		.populate('influencer')
		.populate('kit')
		// .populate('products')
		.then((review) => res.json(review))
		.catch((error) => winstonLogger.error("Couldn't get review", {
      metadata:{
        services:"review-controller: getOne",
        error: error.message
      }
    }))
};

module.exports.getOneAdmin = (req,res) => {
	let {id} = req.params

  Review.findOne({influencer: id}, {title: 1}) 
		.then((review) => res.json(review))
		.catch((error) => console.log(error))
}

module.exports.create = (req, res) => {
  Review.create({
		"title": req.body.title,
		"influencer": req.body.influencer,
		"description": req.body.one,
		"kit": req.body.kit,
		"video": req.body.video,
		"voicenote": req.body.voicenote,
	})
  	.then((review) => {
    test = review._id
    res.json(review)
	})
	.catch((error) => winstonLogger.info("Couldn't create review", {
      metadata:{
        services:"review-controller: create",
        error: error.message
      }
    }))
};

module.exports.edit = (req,res) => {
  Review.update({influencer: req.params.id} , {
		"title": req.body.title,
		"influencer": req.body.influencer,
		"description": req.body.one,
		"kit": req.body.kit,
		"video": req.body.video,
		"voicenote": req.body.voicenote,
    })

	.then((review) => res.status(201).json(review))
	.catch((error) => winstonLogger.error("Couldn't edit review", {
      metadata:{
        services:"review-controller: edit",
        error: error.message
      }
		}
		))
};

module.exports.upvote = (req, res) => {
	const author = mongoose.Types.ObjectId(req.body.user_id);
	Review.update(
		{ influencer: req.body.influencer_id },
		{
			$pull: {
				upvotes: { author: author }
			}
		}
	).exec().then(() => {
		return Review.update(
			{ influencer: req.body.influencer_id },
			{
				$push: { 
					upvotes: { 
						author: author, 
						createdAt: new Date() 
					}
				},
				$pull: { 
					downvotes: { author } 
				}
			}
		).exec();
	})
	 .then(() => res.status(200).send('OK'))
	 .catch((error) => winstonLogger.warn("Couldn't upvote the review", {
		metadata:{
			services:"review-controller: upvote",
			error: error.message
		}
	}));
};

module.exports.upvoteUndo = (req, res) => {
	const author = mongoose.Types.ObjectId(req.body.user_id);

	Review.update(
		{ influencer: req.body.influencer_id },
		{ 
			$pull: { 
				upvotes: { author }  
			}
		}
	).exec()
	 .then(() => res.status(200).send('OK'))
	 .catch((error) => winstonLogger.warn("Couldn't undo upvote the review", {
		metadata:{
			services:"review-controller: upvoteUndo",
			error: error.message
		}
	}));
};

module.exports.downvote = (req,res) => {
  const author = mongoose.Types.ObjectId(req.body.user_id);

	Review.findOneAndUpdate(
		{ influencer: req.body.influencer_id },
		{
			$pull: {
				downvotes: { author: author }
			}
		}
	).exec().then(() => {
		return Review.update(
			{ influencer: req.body.influencer_id },
			{
				$push: { 
					downvotes: {
						author: author,
						createdAt: new Date()
					},
				},
				$pull: { 
					upvotes: { author }
				}
			}
		).exec()
	})
	.then(() => res.status(200).send('OK'))
	.catch((error) => winstonLogger.warn("Couldn't downvote the review", {
		metadata:{
			services:"review-controller: downvote",
			error: error.message
		}
	}));
};

module.exports.downvoteUndo = (req,res) => {
	const author = mongoose.Types.ObjectId(req.body.user_id);

	Review.update(
		{ influencer: req.body.influencer_id },
		{ 
			$pull: { 
				downvotes: { author } 
			} 
		}
	).exec()
	 .then(() => res.status(200).send('OK'))
	 .catch((error) => winstonLogger.warn("Couldn't undo downvote the review", {
		metadata:{
			services:"review-controller: downvoteUndo",
			error: error.message
		}
	}));
};

module.exports.delete = (req, res) => {
  const search = req.params.id;
	Review.findOneAndDelete( 
		{influencer: search}
	)
		.then(review => res.status(201).json(review))
		.catch((error) => winstonLogger.info("Couldn't edit review", {
      metadata:{
        services:"review-controller: delete",
        error: error.message
      }
    }))
};




