const Review = require('../models/Review');
const mongoose = require('mongoose');

module.exports.getOne = (req, res) => {
  let {id} = req.params
  Review.findOne({influencer: id}) //.findById(req.params.restID)
		.populate('influencer')
		.then((review) => res.json(review))
		.catch((err) => res.json(err))
};

module.exports.create = (req, res) => {
  Review.create(req.body)
  .then((review) =>{
    test = review._id
    res.json(review)
    })
  .catch((err) => res.json(err))
};

module.exports.edit = (req,res) => {
  Review.findOneAndUpdate({influencer: req.params.id}, {
		title: req.body.title,
		review: req.body.review,
		video: req.body.video,
		voicenote: req.body.voicenote
    })
		.then((review) => res.status(201).json(review))
		.catch((err) => res.json(err))
};

module.exports.upvote = (req, res) => {
  const userObjectId = mongoose.Types.ObjectId(req.body.user_id);

	Review.update(
		{ influencer: req.body.influencer_id },
		{
			$push: { upvotes: userObjectId },
			$pull: { downvotes: userObjectId }
		}
	).exec()
	 .then(() => res.status(200).send('OK'))
	 .catch(e => next(e));
};

module.exports.upvoteUndo = (req, res) => {
  const userObjectId = mongoose.Types.ObjectId(req.body.user_id);

	Review.update(
		{ influencer: req.body.influencer_id },
		{ $pull: { upvotes: userObjectId } }
	).exec()
	 .then(() => res.status(200).send('OK'))
	 .catch(e => next(e));
};

module.exports.downvote = (req,res) => {
  const userObjectId = mongoose.Types.ObjectId(req.body.user_id);

	Review.update(
		{ influencer: req.body.influencer_id },
		{
			$push: { downvotes: userObjectId },
			$pull: { upvotes: userObjectId }
		}
	).exec()
	 .then(() => res.status(200).send('OK'))
	 .catch(e => next(e));
};

module.exports.downvoteUndo = (req,res) => {
  const userObjectId = mongoose.Types.ObjectId(req.body.user_id);

	Review.update(
		{ influencer: req.body.influencer_id },
		{ $pull: { downvotes: userObjectId } }
	).exec()
	 .then(() => res.status(200).send('OK'))
	 .catch(e => next(e));
};

module.exports.delete = (req, res) => {
  const search = req.params.id;
	Review.findOneAndDelete( 
		{influencer: search}
	)
		.then(review => res.status(201).json(review))
		.catch((e) => console.log(e))
};




