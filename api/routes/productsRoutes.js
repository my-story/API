const express = require('express');
const router  = express.Router();
const productController = require('../controllers/productController')
// const multer = require('multer')
const uploadCloud = require("../config/cloudinary");

//Get all Products in Product Page
router.get('/all', productController.getAll);

//Create a Product for each influencer
router.post('/create', productController.createProduct);

//Add picture
router.post('/upload/picture',uploadCloud.single('picture'), productController.addPicture);


module.exports = router;
