const mongoose = require('mongoose');

const influencerRewardSchema = new mongoose.Schema({
  influencer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Influencer'
  },
  counter: {
    type: Number
  },
  reward: {
    type: Number
  }
}, {timestamps: true});


const InfluencerReward = mongoose.model("InfluencerReward", influencerRewardSchema);

module.exports = InfluencerReward;