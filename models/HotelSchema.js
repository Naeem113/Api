const mongoose = require ('mongoose');

const HotelSchema = mongoose.Schema ({
  _id: mongoose.Schema.Types.ObjectId,
  City_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Cities',
    required: true,
  },
  ResturentName: {
    type: String,
    required: true,
  },
  PhoneNumber: {
    type: String,
  },
  Website: {
    type: String,
    required: true,
  },
  Address: {
    type: String,
  },
  Longitude: {
    type: Number,
  },
  Latitude: {
    type: Number,
  },
  HotelDetail: {
    type: String,
  },
  Images: {},
});

module.exports = mongoose.model ('Hotels', HotelSchema);
