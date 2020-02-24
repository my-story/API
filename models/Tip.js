const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TipSchema = new Schema({
    influencer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Influencer"
    },
    header: String,
    description: String,
    recommendation: String,
    survivalKit: {
      type: Boolean,
      default: false,
    }
})

const Tip = mongoose.model("Tip", TipSchema);
module.exports = Tip;