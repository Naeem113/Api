const mongoose = require ('mongoose');

const CommentSchema = mongoose.Schema ({
  _id: mongoose.Schema.Types.ObjectId,
  Hotel_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Hotels',
    required: true,
  },
  UserName: {
    type: String,
  },
  Rating: {
    type: String,
  },
  Comments: {
    type: String,
  },
  User_image: {
    type: String,
  },
});

module.exports = mongoose.model ('Comments', CommentSchema);
