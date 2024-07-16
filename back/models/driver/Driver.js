const mongoose = require('mongoose');

const DriverSchema = new mongoose.Schema({
  name_driver: {
    type: String,
    required: true,
  },

  first_name_driver: {
    type: String,
    required: true,
  },

  birth_date_driver: {
    type: Date,
    required : true,
  },

  num_cin : {
    type : String,
    required : true,
  },

  num_driving_license : {
    type : String,
    required : true,
  },  

  phone_number_driver : {
    type : String,
    required : true,
  },

  email_driver : {
    type : String,
    required : false,
  },

    timestamps: true, // Ajoute createdAt et updatedAt  
});

const Driver = mongoose.model('Driver', DriverSchema);

module.exports = Driver;
