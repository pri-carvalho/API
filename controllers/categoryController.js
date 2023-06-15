const Category = require('../models/category');

// GET /categories
// Obtient toutes les catégories
const getCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: 'Échec de récupération des catégories' });
  }
};

// GET /categories/:id
// Obtient une catégorie par son ID
const getCategoryById = async (req, res) => {
  const { id } = req.params;
  try {
    const category = await Category.findById(id);
    if (!category) {
      return res.status(404).json({ error: 'Catégorie introuvable' });
    }
    res.json(category);
  } catch (error) {
    res.status(500).json({ error: 'Échec de récupération de la catégorie' });
  }
};

// POST /categories
// Crée une nouvelle catégorie
const createCategory = async (req, res) => {
  const { name } = req.body;
  try {
    const category = await Category.create({ name });
    res.status(201).json(category);
  } catch (error) {
    res.status(500).json({ error: 'Échec de création de la catégorie' });
  }
};

// PUT /categories/:id
// Met à jour une catégorie par son ID
const updateCategory = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  try {
    const category = await Category.findByIdAndUpdate(
      id,
      { name },
      { new: true }
    );
    if (!category) {
      return res.status(404).json({ error: 'Catégorie introuvable' });
    }
    res.json(category);
  } catch (error) {
    res.status(500).json({ error: 'Échec de mise à jour de la catégorie' });
  }
};

// DELETE /categories/:id
// Supprime une catégorie par son ID
const deleteCategory = async (req, res) => {
  const { id } = req.params;
  try {
    const category = await Category.findByIdAndDelete(id);
    if (!category) {
      return res.status(404).json({ error: 'Catégorie introuvable' });
    }
    res.json({ message: 'Catégorie supprimée avec succès' });
  } catch (error) {
    res.status(500).json({ error: 'Échec de suppression de la catégorie' });
  }
};

module.exports = {
  getCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory
};
