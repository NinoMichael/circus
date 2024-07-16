const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const AccountStationSchema = new mongoose.Schema({
  phone_number: {
    type: String,
    required: true,
    match: [
      /^\+?[1-9]\d{1,14}$/,
    ],
  },

  email: {
    type: String,
    required: true,
    unique: true,
    match: [
      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
    ],
  },

  password: {
    type: String,
    required: true,
    minlength : 8,
  },

  isAdmin: {
    type: Boolean,
    default: true,
  },
    timestamps: true, // Ajoute createdAt et updatedAt  
});

// Hash password before saving
AccountStationSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Méthode pour vérifier le mot de passe
AccountStationSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const AccountStation = mongoose.model('AccountStation', AccountStationSchema);

module.exports = AccountStation;
