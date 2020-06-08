const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TechniqueSchema = new Schema( {
      title: String,
      influencer: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Influencer"
      },
      subheading: [{
        header: String,
        descriptions: Array,
      }],
      recommendation: String,
      survivalKit: {
        type: Boolean,
        default: false,
      },
      category: String,
})

const Technique = mongoose.model("Technique", TechniqueSchema);

module.exports = Technique;