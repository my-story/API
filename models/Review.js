const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  title: {
    type: String
  },
  influencer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Influencer'
  },
  kit: {
    type: mongoose.Schema.Types.ObjectId,
    ref:'Kit'
  },
  video: {
    type: String
  },
  upvotes: [{
    createdAt: Date,
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  }],
  downvotes: [{
    createdAt: Date,
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  }],
  voicenote:{
    type: String
  }
}, { timestamps: true });


const Review = mongoose.model("Review", reviewSchema);

module.exports = Review;

