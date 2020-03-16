const mongoose = require ('mongoose');
const Schema   = mongoose.Schema;

const influencerSchema = new Schema({
  name: {
    firstName: String,
    lastName: String,
  },
  profilePic: {
    type: String,
  },
  description: {
    type: String,
  },
  expertise: [{
    type: String,
    enum: ["Athlete","Musician","Tech","Artist", "Runner"]
  }],
  role: {
    type: String,
    enum:["Influencer"],
    default: "Influencer",
}
}, {timestamps:true})

module.exports = mongoose.model('Influencer', influencerSchema)


