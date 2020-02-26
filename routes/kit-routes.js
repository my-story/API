const express = require('express');
const router = express.Router();
const middlewares = require('../middlewears/secure.mid');
const kitController = require('../controllers/kit-controller');

//Get infleuncers that recomend a product
router.get('/popular/:id', kitController.productBackedBy);

//Get kit for review
router.get('/survival/:id', kitController.getKit);

//
router.get('/admin/:id', kitController.getKitAdmin);

//Get product for survival kit
router.get('/product/:id', kitController.getProductSurvival);

//Get List of techniques for creating a kit
router.get('/list/techniques', kitController.getUnassignedTechnique);

//Get List of product recomendations for creating a kit
router.get('/list/products', kitController.getUnassignedProducts);

//Get List of tips for creating a kit
router.get('/list/tips', kitController.getUnassignedTips);

//Update Kit
router.post('/update/kit/:id', middlewares.isAdmin, kitController.updateKit);

//Create technique
router.post('/create/technique', kitController.createTechnique);

//Update technique
router.post('/update/technique/:id',  middlewares.isAdmin, kitController.updateTechnique);

//Create Product Kit
router.post('/create/product', kitController.createSurvivalProduct);

//Update Survival Product Kit
router.post('/update/product/:id', middlewares.isAdmin, kitController.updateProduct);

//Create Tip
router.post('/create/tip', kitController.createSurvivalTips);

//Update Tip
router.post('/update/tip/:id', middlewares.isAdmin, kitController.updateTip);

//Create Kit
router.post('/create', kitController.createKit);


module.exports = router;