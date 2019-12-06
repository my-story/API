const express = require('express');
const router = express.Router();
const kitController = require('../controllers/kit-controller');

router.post('/create',kitController.createKit);
router.get('/kit', kitController.getKit);

module.exports = router;