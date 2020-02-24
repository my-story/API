const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TechniqueSchema = new Schema( {
        influencer: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Influencer"
        },
        title: String,
        subheading: [{
          header: String,
          descriptions: Array,
        }],
        recommendation: String,
        survivalKit: {
          type: Boolean,
          default: false,
        }
})

const Technique = mongoose.model("Technique", TechniqueSchema);

module.exports = Technique;