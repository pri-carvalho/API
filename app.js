"use client"
const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const { connectToDatabase } = require('./config/database');

const app = express();

// Configuration du body parser
app.use(express.json());

// Routes
app.use('/users', userRoutes);
app.use('/products', productRoutes);
app.use('/categories', categoryRoutes);

// Route racine
app.get('/', (req, res) => {
  res.send('Bienvenue sur l\'API (Tp3-Priscila)');
});

// Connexion à la base de données
connectToDatabase();

// Initialisation du serveur
app.listen(3000, () => {
  console.log('Serveur en cours d\'exécution sur le port 3000');
});
