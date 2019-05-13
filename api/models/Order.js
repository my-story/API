const mongoose = require ('mongoose');
const Schema   = mongoose.Schema;

const orderSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  product: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product'
  }],
  state: {
    type: String,
    default: "cart"
  },
  sold: {
    type: Boolean,
    default: false
  }
})

const Order = mongoose.model('Order', orderSchema)

module.exports   = Order;