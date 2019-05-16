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
    enum: ["cart","sold"],
    default: "cart"
  },
  userLogged:{
    type: Boolean,
    default: true
  },
  email:{
    type: String,
  },
  address:{
    type: String,
  },
  city:{
    type: String,
  },
  zip:{
    type: Number,
  },
  cardname:{
    type: String
  }

})

const Order = mongoose.model('Order', orderSchema)

module.exports = Order;