const express = require('express');
const router = express.Router();
const middlewares = require('../middlewears/secure.mid');
const kitController = require('../controllers/kit-controller');

router.post('/create', kitController.createKit);
router.get('/popular/:id', kitController.productBackedBy);
router.get('/survival/:id', kitController.getKit);
router.get('/admin/:id', kitController.getKitAdmin);
router.get('/list/techniques', kitController.getUnassignedTechnique);
router.get('/list/products', kitController.getUnassignedProducts);
router.get('/list/tips', kitController.getUnassignedTips);
router.post('/update/:id', middlewares.isAdmin, kitController.updateKit);
router.post('/create/technique', kitController.createTechnique);
router.post('/create/product', kitController.createSurvivalProduct);
router.post('/create/tip', kitController.createSurvivalTips);

module.exports = router;