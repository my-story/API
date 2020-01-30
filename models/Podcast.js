const mongoose = require ('mongoose');
const Schema   = mongoose.Schema;

const podcastSchema = new Schema({
  influencer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Influencer'
  },
  video:{
    type: String,
  },
  audio:{
    type: String,
  },
  description:{
    type: String,
  },
  image:{
    type: String,
  },
  title:{
    type: String,
  },
  time:{
      type: Number
  }
})

const Podcast = mongoose.model('Podcast', podcastSchema);
module.exports = Podcast;