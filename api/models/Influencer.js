const mongoose = require ('mongoose');
const Schema   = mongoose.Schema;

const influencerSchema = new Schema({
  name: String,
  products : Array,
  images: Array,
  description: String,
  category: [{
    type: String,
    enum: ["Athlete","Musician","Tech","Artist"]
  }]
}, {timestamps:true})

module.exports = mongoose.model('Influencer', influencerSchema)


