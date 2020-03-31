const express = require('express');
const router = express.Router();
const passport = require('../config/passport');
const middlewares = require("../middlewears/secure.mid");

const userController = require('../controllers/user-controller')

const User = require('../models/User');
const winstonLogger = require('../config/error-logs/winston');


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

//Unfavorite Product kit 
router.post('/unfavorite/product/:id/:product', userController.unfavoriteProductKit);

//Unfavorite technique
router.post('/unfavorite/technique/:id/:technique', userController.unfavoriteTechnique);

//Unfavorite tip 
router.post('/unfavorite/tip/:id/:tip', userController.unfavoriteTip);

//Favorite Kit
router.post('/add/kit/:id/:kit', userController.addSurvivalKitId);

//Favorite Techniques
router.post('/add/technique/:id/:technique', userController.addTechniques);

//Favorite Tips
router.post('/add/tip/:id/:tip', userController.addTips);

//Favorite Products 
router.post('/add/product/:id/:product', userController.addProductSurvival);

router.get('/private', middlewares.isAuthenticated, userController.private);

router.post('/logout', userController.logout);

router.post('/upvote/:id', middlewares.isAuthenticated, userController.upvote);

router.post('/downvote/:id', middlewares.isAuthenticated, userController.downvote);

router.post('/pull/upvote/:id',middlewares.isAuthenticated, userController.upvoteUndo);

router.post('/pull/downvote/:id', middlewares.isAuthenticated, userController.downvoteUndo);


module.exports = router;
