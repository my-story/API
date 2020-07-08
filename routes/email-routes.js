const express = require('express');
const router = express.Router();
const emailController = require('../controllers/email-controller');

//Get all Influencers in Product Page
router.post('/add', emailController.addEmail);

router.post('/subscriber', emailController.addSubscriber);


module.exports = router;