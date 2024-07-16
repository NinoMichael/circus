const mongoose = require('mongoose');

const CoopSchema = new mongoose.Schema({
  accountCoop: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'AccountCoop', 
    required: true,
    },

  name_coop: {
    type: String,
    required: true,
  },

  date_creation : {
    type: Date,
    required: true,
  },

  description_coop: {
    type: String,
    required: true,
  },

    timestamps: true, // Ajoute createdAt et updatedAt  
});

const Coop = mongoose.model('Coop', CoopSchema);

module.exports = Coop;
