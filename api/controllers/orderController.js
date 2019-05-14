const Order = require('../models/Order');
const createError = require('http-errors');

module.exports.createOrder = (req, res, next) => {
  Order.findOneAndUpdate(
    { user: req.user.id, state: 'cart' },
    { $addToSet: { product: [req.body._id] }}, 
    { new: true })
    .then(order => {
      if (order) {
        res.status(201).json(order)
      } else {
        return new Order({
          user: req.user.id,
          product: req.body._id
        })
        .save()
        .then(order => {
          res.status(201).json(order)
        })
      }
    })
    .catch(next)
}



module.exports.getCart = (req, res, next) => {
  // console.info('USER ID => ', req.params.id)
  Order.findOne({ user: req.params.id, state: 'cart' })
    .populate('product')
    .then(order => res.json(order))
    .catch(next)
}

//5ca87284bef68c3a4349f84a

module.exports.deleteProduct = (req, res, next) => {
  const search = req.params.id
  console.log("QUERYYYYYYY:", search);

  Order.findOneAndUpdate(
    { user: req.user.id, state: 'cart' },
    { $pull: { product: search }}, 
    { new: true }
  )
    .populate('product')
    .then(order => {
      res.status(201).json(order)
    })
    .catch(next)
}

module.exports.deleteOrder = (req, res, next) =>{
  const search = req.params.id;
  console.log("user" , search)

  Order.findOneAndDelete({ user: req.user.id, state: 'cart' })
     .then(order => {
      res.status(201).json(order)
    })
    .catch(next)
}