const express = require('express');
const router  = express.Router();
const productController = require('../controllers/productController')


//Gtet all Products in Product Page
router.get('/all', productController.getAll);

//Create a Product for each infleuncer
router.post('/create',productController.createProduct);

module.exports = router;
