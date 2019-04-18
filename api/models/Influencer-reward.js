const mongoose = require ('mongoose');
const Schema   = mongoose.Schema;

const rewardSchema = new Schema({
    // influencer: schema.object.id;
    // product: shcema.object.id,
    // counter: Number,
    // units: Number,
    // commission: 0.9%
})

module.exports = mongoose.model('Reward', influencerSchema)
