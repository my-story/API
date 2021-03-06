const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SurvivalSchema = new Schema({
  title: String,
  influencer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Influencer'
  },
  products: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'SurvivalProduct',
  }],
  tips: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Tip',
  }],
  techniques: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Technique',
  }],
  category: String,
})

const Kit =  mongoose.model('Kit', SurvivalSchema);
module.exports = Kit;