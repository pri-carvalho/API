const fs = require('fs');
const mongoose = require('mongoose');
const path = require('path');
const User = require('../models/user');
const Product = require('../models/product');
const Category = require('../models/category');

// Ajouter le dossier 'dw3_tp3_bd' au chemin
const dw3Tp3BdDirectory = path.join(path.resolve(__dirname, '..'), 'dw3_tp3_bd');

// Fonction pour lire le contenu du fichier JSON
const readJSONFile = (filename) => {  
  const data = fs.readFileSync(filename, 'utf8');
  return JSON.parse(data);
};

const connectToDatabase = async () => {
  try {
    // Connexion à la base de données MongoDB
    await mongoose.connect('mongodb+srv://prillcarvalho:prisciLA0414@cluster0.zo7yxt3.mongodb.net/tp3_priscila?retryWrites=true&w=majority', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connexion à la base de données établie avec succès');
    //await importData(); // Importe les données une fois la connexion établie
  } catch (error) {
    console.error('Erreur lors de la connexion à la base de données :', error.message);
    process.exit(1); // Quitte l'application en cas d'erreur de connexion
  }
};

// Fonction pour importer les données des utilisateurs
const importUsers = async () => {
  try {
    const usersData = readJSONFile(path.posix.parse(dw3Tp3BdDirectory + '\\users.json').base);    
    await User.create(usersData);
    console.log('Données des utilisateurs importées avec succès');
  } catch (error) {
    console.error('Erreur lors de l\'importation des données des utilisateurs :', error);
  }
};

// Fonction pour importer les données des produits
const importProducts = async () => {
  try {
    const productsData = readJSONFile(path.posix.parse(dw3Tp3BdDirectory + '\\products.json').base);
    await Product.create(productsData);
    console.log('Données des produits importées avec succès');
  } catch (error) {
    console.error('Erreur lors de l\'importation des données des produits :', error);
  }
};

// Fonction pour importer les données des catégories
const importCategories = async () => {
  try {
    const categoriesData = readJSONFile(path.posix.parse(dw3Tp3BdDirectory + '\\categories.json').base);
    await Category.create(categoriesData);
    console.log('Données des catégories importées avec succès');
  } catch (error) {
    console.error('Erreur lors de l\'importation des données des catégories :', error);
  }
};

// Fonction principale pour importer toutes les données
const importData = async () => {
  await importUsers();
  await importProducts();
  await importCategories();
  mongoose.connection.close();
  console.log('Processus d\'importation terminé');
};

module.exports = {
  connectToDatabase,
};
