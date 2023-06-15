// Importation des dépendances et des contrôleurs nécessaires
const express = require('express');
const categoryController = require('../controllers/categoryController');
const authenticationMiddleware = require('../middlewares/authentication');

// Création de l'objet de routage Express
const router = express.Router();

// Route GET pour lister toutes les catégories
router.get('/', categoryController.getCategories);

// Route GET pour obtenir une catégorie par son ID
router.get('/:id', categoryController.getCategoryById);

// Route POST pour créer une nouvelle catégorie
// Utilise le middleware d'authentification pour vérifier si l'utilisateur est un administrateur
router.post('/', authenticationMiddleware.verifyAdmin, categoryController.createCategory);
// router.post('/', categoryController.createCategory);


// Route PUT pour mettre à jour une catégorie par son ID
// Utilise le middleware d'authentification pour vérifier si l'utilisateur est un administrateur
router.put('/:id', authenticationMiddleware.verifyAdmin, categoryController.updateCategory);
// router.put('/:id', categoryController.updateCategory);

// Route DELETE pour supprimer une catégorie par son ID
// Utilise le middleware d'authentification pour vérifier si l'utilisateur est un administrateur
router.delete('/:id', authenticationMiddleware.verifyAdmin, categoryController.deleteCategory);
// router.delete('/:id', categoryController.deleteCategory);

// Exportation de l'objet de routage
module.exports = router;
