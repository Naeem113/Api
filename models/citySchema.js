const mongoose = require ('mongoose');

const CitySchema = mongoose.Schema ({
  _id: mongoose.Schema.Types.ObjectId,
  CityName: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model ('Cities', CitySchema);
