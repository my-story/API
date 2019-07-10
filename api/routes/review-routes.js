const express    = require('express');
const router     = express.Router();
const middlewares = require("../middlewears/secure.mid");
const reviewController = require('../controllers/review-controller');

//Get One
router.get('/specific/:id', reviewController.getOne);
//New
router.post('/new', middlewares.isAdmin, reviewController.create);
//Edit
router.post('/edit/:id', middlewares.isAdmin, reviewController.edit);
//Upvote
router.patch('/upvote', middlewares.isAuthenticated, reviewController.upvote);
//Upvote Undo
router.patch('/upvote/undo', middlewares.isAuthenticated, reviewController.upvoteUndo);
//Downtown
router.patch('/downvote', middlewares.isAuthenticated, reviewController.downvote);
//Downvote Undo
router.patch('/downvote/undo', middlewares.isAuthenticated, reviewController.downvoteUndo);
//Delete
router.post("/delete/:id", middlewares.isAdmin, reviewController.delete);

module.exports = router;
