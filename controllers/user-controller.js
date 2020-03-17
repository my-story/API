const User = require('../models/User')
const passport = require('../config/passport');
const winstonLogger = require('../config/error-logs/winston');

//Add survival Kit id
module.exports.addSurvivalKitId = (req,res) => {
  User.findOneAndUpdate(
    {_id: req.params.id},
    {$push: {kits: req.params.kit}},
    {new: true}
  )
  .then((user) => {
    res.status(201).json(user)

  })
  .catch((error) => winstonLogger.info("Couldn't Add Survival kit id to user", {
    metadata:{
      services:"user-controller: addSurvivalKitId",
      error: error.message
    }
  }));
};


//Favorite product to user
module.exports.addProductSurvival = (req,res) => {
  User.findOneAndUpdate(
    {_id: req.params.id},
    {$push: {products: req.params.product}},
    {new: true}
  )
  .then((user) => {
    res.status(201).json(user)
  })
  .catch((error) => winstonLogger.info("Couldn't Add ProductKit to user", {
    metadata:{
      services:"user-controller: addProductSurvival",
      error: error.message
    }
  }));
};

//Favorite tips to user
module.exports.addTips = (req, res) => {
  User.findOneAndUpdate(
    {_id: req.params.id},
    {$push: {tips: req.params.tip}},
    {new: true}
  )
  .then((user) => {
    res.status(201).json(user)
  })
  .catch((error) => winstonLogger.info("Couldn't Add Tip to user", {
    metadata:{
      services:"user-controller: addTips",
      error: error.message
    }
  }));
}

//Favorite Techniques to user
module.exports.addTechniques = (req, res) => {
  User.findOneAndUpdate(
    {_id: req.params.id},
    {$push: {techniques: req.params.technique}},
    {new: true}
  )
    .then((user) => {
      res.status(201).json(user)
    })
    .catch((error) => winstonLogger.info("Couldn't Add technique to user", {
      metadata:{
        services:"user-controller: addTechniques",
        error: error.message
      }
    }));
};

//Sign up
module.exports.singUp = (req, res) => {
  const { username, password, firstName, lastName } = req.body;
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
      console.log(req.body)
        const newUser = new User( {
          username: username,
          password: password,
          firstName: firstName,
          lastName: lastName
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
  console.log(req.user)
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

  
