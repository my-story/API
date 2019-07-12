const User = require('../models/User')
const passport = require('../config/passport');
const winstonLogger = require('../config/error-logs/winston');

module.exports.singUp = (req, res) => {
  const { username, password } = req.body
  User.findOne({ username: username }, (err, user) => {
    if (err) {
        winstonLogger.error("signup not working", {
          metadata:{
            services:"user-controller: singUp",
            error: err.message
          }
        });
    } else if (user) {
        res.json( {error: `Sorry, already a user with the username: ${username}`})
    } else {
        const newUser = new User( {
          username: username,
          password: password
        });
        newUser.save((err, savedUser) => {
          if (err) return res.json(err)
          res.json(savedUser)
          req.session.username = req.body.username;
        })
    };
  });
};


module.exports.private = (req, res) => {
  res.send(req.user);
};

module.exports.logout = (req, res) => {
  if (req.user) {
    req.logout()
    res.status(200).json(req.user)
} else {
  createError(403, "this user is already logged-out");
}
};

module.exports.upvote = (req, res) => {
  User.findOneAndUpdate(
    { _id: req.params.id},
    { $push: { reviewsUpvoted: [req.body.reviewId] }}, 
    { new: true })
      .then(user => res.status(201).json(user))
      .catch((error) => winstonLogger.info("Couldn't upvote", {
        metadata:{
          services:"user-controller: upvote",
          error: error.message
        }
      }));
};

module.exports.downvote = (req, res) => {
  User.findOneAndUpdate(
    { _id: req.params.id},
    { $push: { reviewsDownvoted: [req.body.reviewId] }}, 
    { new: true })
    .then(user => {
        res.status(201).json(user)
    })
    .catch((error) => winstonLogger.info("Couldn't downvote", {
      metadata:{
        services:"user-controller: downvote",
        error: error.message
      }
    }));
};

module.exports.upvoteUndo = (req, res) => {
  User.findOneAndUpdate(
    { _id: req.params.id},
    { $pull: { reviewsUpvoted: req.body.reviewId }}, 
    { new: true })
    .then(user => res.status(201).json(user))
    .catch((error) => winstonLogger.info("Couldn't upvote undo", {
      metadata:{
        services:"user-controller: upvoteUndo",
        error: error.message
      }
    }));
};

module.exports.downvoteUndo = (req, res) => {
  User.findOneAndUpdate(
    { _id: req.params.id},
    { $pull: { reviewsUpvoted: req.body.reviewId }}, 
    { new: true })
    .then(user => res.status(201).json(user))
    .catch((error) => winstonLogger.info("Couldn't downvote undo", {
      metadata:{
        services:"user-controller: downvoteUndo",
        error: error.message
      }
    }));
}

  
