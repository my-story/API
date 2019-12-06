const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SurvivalSchema = new Schema({
  influencer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Influencer'
  },
  products: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product'
  }],
  tips: [{
    header: String,
    description: Array
  }],
  role: {
    type: String,
    enum: ['Survival','Habit']
  },
})

const Kit =  mongoose.model('Kit', SurvivalSchema);
module.exports = Kit;