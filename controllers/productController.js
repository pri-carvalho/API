const Product = require('../models/product');

// GET /products
// Récupère tous les produits
const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Échec de récupération des produits' });
  }
};

// GET /products/:id
// Récupère un produit par son ID
const getProductById = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ error: 'Produit introuvable' });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: 'Échec de récupération du produit' });
  }
};

// POST /products
// Crée un nouveau produit
const createProduct = async (req, res) => {
  const { title, description, price, imageUrl, categoryId, userId, isSold } = req.body;
  try {
    const product = await Product.create({ title, description, price, imageUrl, categoryId, userId, isSold });
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ error: 'Échec de création du produit' });
  }
};

// PUT /products/:id
// Met à jour un produit par son ID
const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { title, description, price, imageUrl, categoryId, userId, isSold } = req.body;
  try {
    const product = await Product.findByIdAndUpdate(
      id,
      { title, description, price, imageUrl, categoryId, userId, isSold },
      { new: true }
    );
    if (!product) {
      return res.status(404).json({ error: 'Produit introuvable' });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: 'Échec de mise à jour du produit' });
  }
};

// DELETE /products/:id
// Supprime un produit par son ID
const deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findByIdAndDelete(id);
    if (!product) {
      return res.status(404).json({ error: 'Produit introuvable' });
    }
    res.json({ message: 'Produit supprimé avec succès' });
  } catch (error) {
    res.status(500).json({ error: 'Échec de suppression du produit' });
  }
};

// GET /products/user/:userId
// Récupère tous les produits d'un utilisateur par l'ID de l'utilisateur
const getProductsByUserId = async (req, res) => {
  const { userId } = req.params;
  try {
    const products = await Product.find({ userId });
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Échec de récupération des produits de l\'utilisateur' });
  }
};

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductsByUserId
};
