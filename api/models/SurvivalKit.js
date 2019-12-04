const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SurvivalSchema = new Schema({
  influencer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Influencer'
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product'
  },
  role: {
    type: String,
    enum: ['Survival','Habit']
  },
  category: [{
    type: String,
    enum:['Health','Book','Tech', 'ETC']
  }],
  // DESCRIPTION OF EXPERT
  description: String,
  backed: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Influencer'
  }],
})

const SurvivalKit =  mongoose.model('SurvivalKit', SurvivalSchema);
module.exports = SurvivalKit;