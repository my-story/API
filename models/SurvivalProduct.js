const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SurvivalProductSchema = new Schema({
    influencer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Influencer"
    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product"
    },
    recommendation: String,
    comment: String,
    survivalKit: {
        type: Boolean,
        default: false,
    }
})


const SurvivalProduct = mongoose.model("SurvivalProduct", SurvivalProductSchema);

module.exports = SurvivalProduct;