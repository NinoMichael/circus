const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const connectDB = require('./config/db'); // Importer la fonction de connexion à la base de données
require('.env').config(); // Charger les variables d'environnement

const app = express();

// Connecter à la base de données
connectDB();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Définir une route de base
app.get('/', (req, res) => {
  res.send('Bienvenue sur le système de réservation de transport régional');
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
