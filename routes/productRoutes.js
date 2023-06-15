const express = require('express');
const productController = require('../controllers/productController');
const { verifyToken } = require('../middlewares/authentication');

const router = express.Router();

// Route GET pour lister tous les produits
router.get('/', productController.getProducts);

// Route GET pour obtenir un produit par son ID
router.get('/:id', productController.getProductById);

// Route POST pour créer un nouveau produit
// Utilise le middleware d'authentification pour vérifier le jeton de l'utilisateur
//router.post('/', verifyToken, productController.createProduct);
router.post('/', productController.createProduct);


// Route DELETE pour supprimer un produit par son ID
// Utilise le middleware d'authentification pour vérifier le jeton de l'utilisateur
//router.delete('/:id', verifyToken, productController.deleteProduct);
router.delete('/:id', productController.deleteProduct);

// Route GET pour obtenir la liste des produits vendus par un utilisateur spécifique
//router.get('/user/:userId', productController.getProductsByUserId);
router.get('/user/:userId', productController.getProductsByUserId);

module.exports = router;
