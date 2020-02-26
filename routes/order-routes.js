const express = require('express');
const router = express.Router();
const orderController = require('../controllers/order-controller');


//Get the cart
router.get('/:id', orderController.getCart);

//Send order pay
router.post('/payment',orderController.paymentCart);

//Delete Product
router.post('/delete/:id', orderController.deleteProduct);

//Delete Order
router.post('/delete', orderController.deleteOrder);

//Create Order
router.post('/', orderController.createOrder);

//Add Product to order/cart
router.post('/add',orderController.orderMake);

module.exports = router;