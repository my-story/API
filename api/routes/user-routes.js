const express = require('express')
const router = express.Router()
const passport = require('../config/passport');
const middlewares = require("../middlewears/secure.mid");
const userController = require('../controllers/user-controller')

router.post('/', userController.singUp);

router.post('/login',
  function (req, res, next) {
    //   console.log('logging in');
      next()
  },
  passport.authenticate('local'),
  (req, res,next) => {
      console.log('logged in', req.user);

      var userInfo = {
          id: req.user._id,
          username: req.user.username
      };

      res.send(req.user)
      res.status(200).json(req.user)
  });

router.get('/private', middlewares.isAuthenticated, (req, res, next) => {
  res.send(req.user);
});

router.get('/private', middlewares.isAuthenticated, userController.private);

router.post('/logout', userController.logout);

router.post('/upvote/:id', middlewares.isAuthenticated, userController.upvote);

router.post('/downvote/:id', middlewares.isAuthenticated, userController.downvote);

router.post('/pull/upvote/:id',middlewares.isAuthenticated, userController.upvoteUndo);

router.post('/pull/downvote/:id', middlewares.isAuthenticated, userController.downvoteUndo);


module.exports = router;
