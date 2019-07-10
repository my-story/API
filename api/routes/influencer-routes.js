const express = require('express');
const router  = express.Router();
const winstonLogger = require('../config/error-logs/winston');
const middleweares = require("../middlewears/secure.mid");
const influencerController = require('../controllers/influencer-controller');

//Get all Influencers in Product Page
router.get('/all', influencerController.getAll);

// Filter categories
router.get("/filter/category", influencerController.filterButton);

//filtro influencer
router.get('/filter', influencerController.filterSearch);

router.get("/:id", influencerController.profile);

//Create a Influencer for each influencer
router.post('/create', middleweares.isAdmin, influencerController.create);

//ADD Reward
router.post('/reward/:id', influencerController.addReward);

//Update a INfluencer for each infleuncer
router.post('/edit/:id', middleweares.isAdmin, influencerController.edit);

//Delete Influencer
router.post("/delete/:id", middleweares.isAdmin, influencerController.delete);

module.exports = router;
