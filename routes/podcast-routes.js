const express = require('express');
const router = express.Router();
const podcastController = require('../controllers/podcast-controller')

router.get('/all', podcastController.getAll);
router.post('/create', podcastController.create);
router.get('/detail/:id', podcastController.getOne);
router.post('/:id', podcastController.edit);
//Filter
router.get("/filter", podcastController.filter);
//Get last
router.get("/last", podcastController.getLast);

module.exports = router;