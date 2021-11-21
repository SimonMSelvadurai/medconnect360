const mongoose = require('mongoose');
const { Schema } = mongoose;


const reviewSchema = new Schema({
    
    user: {
        type: Schema.Types.ObjectId,
        ref: "users",
      },
      text: {
        type: String,
        require: true,
      },
      name: {
        type: String,
      },
      avatar: {
        type: String,
      },
      date: {
        type: String,
      },
  
});



const Review = mongoose.model('Review', reviewSchema);
module.exports = Review;