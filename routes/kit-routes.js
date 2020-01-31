const express = require('express');
const router = express.Router();
const kitController = require('../controllers/kit-controller');

router.post('/create', kitController.createKit);
router.get('/popular/:id', kitController.productBackedBy);
router.get('/survival/:id', kitController.getKit);

module.exports = router;