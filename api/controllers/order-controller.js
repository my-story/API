
// const createError = require('http-errors');
const winstonLogger = require('../config/error-logs/winston');
const Order = require('../models/Order');

module.exports.createOrder = (req, res, next) => {
  Order.findOneAndUpdate (
    { user: req.user.id, state: 'cart' },
    { $push: { product: [req.body._id] }}, 
    { new: true })
    .then(order => {
      if (order) {
        res.status(201).json(order)
      } else {
        return new Order( {
          user: req.user.id,
          product: req.body._id,
        })
        .save()
        .then(order => res.status(201).json(order))
      }
    })
    .catch((error) => winstonLogger.error("Couldn't create Order", {
      metadata:{
        services:"order-controller: createOrder",
        error: error
      }
    }));
}


module.exports.orderMake = (req,res,next) => {
  if(req.body.user) {
    Order.create( {
      user:req.body.user,
      email: req.body.email,
      address:req.body.address, 
      cardname: req.body.name,
      userLogged: true,
      products: req.body.products,
      state:"sold"
    })
      .then((order) => res.json(order))
      .catch((error) => winstonLogger.error("Couldn't create Order", {
        metadata:{
          services:"order-controller: orderMake",
          error: error
        }
      }));
  } else {
    Order.create( {
      email: req.body.email,
      address:req.body.address, 
      cardname: req.body.name,
      userLogged: false,
      product: req.body.products,
      state:"sold"
    })
    .then((order) => res.json(order))
    .catch((error) => winstonLogger.error("Couldn't create Order", {
      metadata:{
        services:"order-controller: orderMake",
        error: error
      }
    }));
  }
};

module.exports.getCart = (req, res, next) => {
  Order.findOne({ user: req.params.id, state: 'cart' })
    .populate('product')
    .then(order => res.json(order))
    .catch((error) => winstonLogger.info("Couldn't get Cart", {
      metadata:{
        services:"order-controller: getCart",
        error: error
      }
    }));
}


module.exports.paymentCart = (req,res,next) => {
  Order.findOneAndUpdate({user:req.user._id , state:"cart"}, {
    state: 'sold', 
    address:req.body.address, 
    zip:req.body.address_zip, 
    city:req.body.address_city,
    cardname: req.body.cardname
  })
    .then(order => res.json(order))
    .catch((error) => winstonLogger.error("Couldn't update payment cart", {
      metadata:{
        services:"order-controller: paymentCart",
        error: error
      }
    }));
}


module.exports.deleteProduct = (req, res, next) => {
  const search = req.params.id;
  Order.findOneAndUpdate(
    { user: req.user.id, state: 'cart' },
    { $pull: { product: search }}, 
    { new: true }
  )
    .populate('product')
    .then(order => res.status(201).json(order))
    .catch((error) => winstonLogger.verbose("Couldn't delete product", {
      metadata:{
        services:"order-controller: deleteProduct",
        error: error
      }
    }));
}


module.exports.deleteOrder = (req, res, next) => {
  const search = req.params.id;
  Order.findOneAndDelete({ user: req.user.id, state: 'cart' })
    .then(order => res.status(201).json(order))
    .catch((error) => winstonLogger.info("Couldn't delete order", {
      metadata:{
        services:"order-controller: deleteOrder",
        error: error
      }
    }));
};

