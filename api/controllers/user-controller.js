const User = require('../models/User')
const passport = require('../config/passport');

module.exports.singUp = (req, res) => {
  const { username, password } = req.body
  User.findOne({ username: username }, (err, user) => {
    if (err) {
        console.log('User.js post error: ', err)
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

// module.exports.login =
// passport.authenticate('local'),
// (req, res,next) => {
//     console.log('logged in', req.user);

//     var userInfo = {
//         id: req.user._id,
//         username: req.user.username
//     };

//     res.send(req.user)
//     res.status(200).json(req.user)
// };

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
      .catch(next)
};

module.exports.downvote = (req, res) => {
  User.findOneAndUpdate(
    { _id: req.params.id},
    { $push: { reviewsDownvoted: [req.body.reviewId] }}, 
    { new: true })
    .then(user => {
        res.status(201).json(user)
    })
    .catch(next)
};

module.exports.upvoteUndo = (req, res) => {
  User.findOneAndUpdate(
    { _id: req.params.id},
    { $pull: { reviewsUpvoted: req.body.reviewId }}, 
    { new: true })
    .then(user => res.status(201).json(user))
    .catch(next)
};

module.exports.downvoteUndo = (req, res) => {
  User.findOneAndUpdate(
    { _id: req.params.id},
    { $pull: { reviewsUpvoted: req.body.reviewId }}, 
    { new: true })
    .then(user => res.status(201).json(user))
    .catch(next)
}

  
