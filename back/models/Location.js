const mongoose = require('mongoose');

const LocationSchema = new mongoose.Schema({
   title_location: {
       type : String,
       required: true,
    },  

  coordonnee_location: {
    type: [String],
    required: true,
  },npm

});

const Location = mongoose.model('Location', LocationSchema);

module.exports = Location;
