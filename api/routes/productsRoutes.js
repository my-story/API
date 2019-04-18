const express = require('express');
const router  = express.Router();
const productController = require('../controllers/productController')
const multer = require("multer");
const uploadCloud = require("../config/cloudinary");

//Gtet all Products in Product Page
router.get('/all', productController.getAll);

//Create a Product for each infleuncer
router.post('/create',productController.createProduct);

//Add picture
router.post('/upload/picture', productController.addPicture);


module.exports = router;
