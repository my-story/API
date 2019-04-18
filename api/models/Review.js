const mongoose = require('mongoose');
    const reviewSchema = new mongoose.Schema({
      title:{
        type: String
      },
      influencer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Influencer'
      },
      product: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
      }],
      review: {
        type: String
      },
      likes:{
        type: Array
      },
      video:{
        type: String
      },
      photo:{
        type: String
      },
      voicenote:{
        type: String
      }
    }, {timestamps: true});
    
const Review = mongoose.model("Review", reviewSchema);
module.exports = Review;
