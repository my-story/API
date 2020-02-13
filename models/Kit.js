const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SurvivalSchema = new Schema({
  title: String,
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
    title: String,
    technique: [{
      header: String,
      descriptions: Array,
    }],
    video: String
  }],
  role: {
    type: String,
    enum: ['Survival','Habit']
  },
  category: String,
})

const Kit =  mongoose.model('Kit', SurvivalSchema);
module.exports = Kit;