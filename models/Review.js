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
<<<<<<< HEAD
=======
  description: {
    type: String
  },
>>>>>>> 408ab585bffe43c53675d3a2f091cdbf3fc55bbd
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

