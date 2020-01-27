const mongoose = require ('mongoose');
const Schema   = mongoose.Schema;

const productSchema = new Schema({
  model: String,
  prize : Number,
  total: Number,
  images: [{
    type: String,
  }],
  description: String,
  category: [{
    type: String,
    enum: ["Sports","Music","Tech","Clothes"]
  }]
},{timestamps:true})

module.exports = mongoose.model('Product', productSchema)


