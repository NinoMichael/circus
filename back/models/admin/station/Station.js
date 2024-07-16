const mongoose = require('mongoose');

const StationSchema = new mongoose.Schema({
  name_station: {
    type: String,
    required: true,
  },

  date_creation_station: {
    type: Date,
    required: true,
  },

  city: {
    type : String,
    required : true,
  },

  region: {
    type : String,
    required : true,
  },

  description_station: {
    type : String,
    required : true,
  },

    timestamps: true, // Ajoute createdAt et updatedAt  
});

const Station = mongoose.model('Driver', StationSchema);

module.exports = Station;
