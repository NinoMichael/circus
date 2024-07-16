const mongoose = require('mongoose');

const CarSchema = new mongoose.Schema({
  accountCoop: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'AccountCoop', 
    required: true,
    },

   driver: {
       type: mongoose.Schema.Types.ObjectId,
       ref: 'Driver', 
       required: true,
    },  

  num_registration: {
    type: String,
    required: true,
  },

  type_car: {
    type: String,
    required: true,
    enum : ['Sprinter', 'Crafter', 'Mazda'],
  },

  statut_car: {
    type: String,
    required: true,
    enum : ['Disponible', 'En voyage', 'En entretien', 'Vacant'],
  },

    timestamps: true, // Ajoute createdAt et updatedAt  
});

const Car = mongoose.model('Driver', CarSchema);

module.exports = Car;
