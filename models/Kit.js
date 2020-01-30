const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SurvivalSchema = new Schema({
  influencer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Influencer'
  },
  products: [{
    product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    },
    comment: String
  }],
  tips: [{
    header: String,
    description: String,
    video: String
  }],
  techniques: [{
    header: String,
    description: Array,
    video: String
  }],
  role: {
    type: String,
    enum: ['Survival','Habit']
  },
  category: {
    type: String,
    enum: ["Addiction", "Sleep", "Spirituality"]
  }
})

const Kit =  mongoose.model('Kit', SurvivalSchema);
module.exports = Kit;