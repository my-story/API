const express = require('express');
const router = express.Router();
const middlewares = require('../middlewears/secure.mid');
const kitController = require('../controllers/kit-controller');

router.post('/create', kitController.createKit);
router.get('/popular/:id', kitController.productBackedBy);
router.get('/survival/:id', kitController.getKit);
router.get('/admin/:id', kitController.getKitAdmin);
router.post('/update/:id', middlewares.isAdmin, kitController.updateKit);
router.post('/create/technique', kitController.createTechnique);


module.exports = router;