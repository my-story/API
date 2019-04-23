const mongoose = require ('mongoose');
const Schema   = mongoose.Schema;

const influencerSchema = new Schema({
  name: String,
  product : {
    type: Schema.Types.ObjectId,
    ref: "Product"
  },
  images: Array,
  description: String,
  category: [{
    type: String,
    enum: ["Athlete","Musician","Tech","Artist"]
  }],
  role: {
    type: String,
    enum:["Influencer","Admin"],
    default: "Influencer",
}
}, {timestamps:true})

module.exports = mongoose.model('Influencer', influencerSchema)


