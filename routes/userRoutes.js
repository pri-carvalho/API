const express = require('express');
const userController = require('../controllers/userController');
const { requireAuth } = require('../middlewares/authentication');

const router = express.Router();

// Route GET pour récupérer tous les utilisateurs
/* router.get('/', requireAuth, (req, res) => {
  userController.getUsers(req, res);
}); */
router.get('/', userController.getUsers);

// Route GET pour obtenir un utilisateur par son ID
router.get('/:id', requireAuth, (req, res) => {
  userController.getUserById(req, res);
});

// Route GET pour obtenir le profil de l'utilisateur connecté
router.get('/profil', requireAuth, (req, res) => {
  userController.getCurrentUserProfile(req, res);
});

// Route PUT pour mettre à jour un utilisateur par son ID
router.put('/:id', requireAuth, (req, res) => {
  userController.updateUser(req, res);
});

// Route DELETE pour supprimer un utilisateur par son ID
router.delete('/:id', requireAuth, (req, res) => {
  userController.deleteUser(req, res);
});

// Route GET pour obtenir le panier de l'utilisateur
router.get('/cart', requireAuth, (req, res) => {
  userController.getUserCart(req, res);
});

// Route PUT pour ajouter un produit au panier de l'utilisateur
router.put('/cart', requireAuth, (req, res) => {
  userController.addToCart(req, res);
});

// Route DELETE pour supprimer un produit du panier de l'utilisateur par son ID
router.delete('/cart/:id', requireAuth, (req, res) => {
  userController.removeFromCart(req, res);
});

// Route POST pour la connexion d'un utilisateur
router.post('/login', (req, res) => {
  userController.login(req, res);
});

// Route POST pour créer un nouvel utilisateur
router.post('/signup', (req, res) => {
  userController.createUser(req, res);
});

// Route GET pour effectuer une recherche de produits
router.get('/search', (req, res) => {
  userController.searchProducts(req, res);
});

module.exports = router;

