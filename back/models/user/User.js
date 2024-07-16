const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  accountUser: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'AccountUser', 
    required: true,
    },

  name_user: {
    type: String,
    required: true,
  },

  first_name_user: {
    type: String,
    required: true,
  },

  birth_date_user: {
    type: Date,
    required : true,
  },

  city : {
    type : String,
    required : true,
  },

  region : {
    type : String,
    required : true,
  },

  num_cin : {
    type : String,
    required : true,
  },

  payment_method : {
    type : String,
    required : true, 
    enum : ['Espèces', 'Mvola', 'Orange Money', 'Airtel Money'],
  },

    timestamps: true, // Ajoute createdAt et updatedAt  
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
