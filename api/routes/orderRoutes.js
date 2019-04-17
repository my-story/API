const express = require('express');
const router = express.Router();
const orderController = require('../controllers/order.controller');


router.post('/', orderController.createOrder);
router.get('/:id', orderController.getCart);
router.post('/delete/:id', orderController.deleteProduct);
router.post('/delete', orderController.deleteOrder);

module.exports = router;