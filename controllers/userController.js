const User = require('../models/user');

// GET /users
// Obtient tous les utilisateurs
const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Échec de récupération des utilisateurs' });
  }
};

// GET /users/:id
// Obtient un utilisateur par son ID
const getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ error: 'Utilisateur introuvable' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Échec de récupération de l\'utilisateur' });
  }
};

// POST /users
// Crée un nouvel utilisateur
const createUser = async (req, res) => {
  const { firstname, lastname, email, city, password, isAdmin } = req.body;
  try {
    const user = await User.create({
      firstname,
      lastname,
      email,
      city,
      password,
      isAdmin
    });
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: 'Échec de création de l\'utilisateur' });
  }
};

// PUT /users/:id
// Met à jour un utilisateur par son ID
const updateUser = async (req, res) => {
  const { id } = req.params;
  const { firstname, lastname, email, city, password, isAdmin } = req.body;
  try {
    const user = await User.findByIdAndUpdate(
      id,
      { firstname, lastname, email, city, password, isAdmin },
      { new: true }
    );
    if (!user) {
      return res.status(404).json({ error: 'Utilisateur introuvable' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Échec de mise à jour de l\'utilisateur' });
  }
};

// DELETE /users/:id
// Supprime un utilisateur par son ID
const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      return res.status(404).json({ error: 'Utilisateur introuvable' });
    }
    res.json({ message: 'Utilisateur supprimé avec succès' });
  } catch (error) {
    res.status(500).json({ error: 'Échec de suppression de l\'utilisateur' });
  }
};

// GET /profil
// Obtient le profil de l'utilisateur courant
const getCurrentUserProfile = async (req, res) => {
  const userId = req.userId; // Obtient l'ID de l'utilisateur courant à partir du jeton d'authentification
  
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'Utilisateur introuvable' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Échec de récupération du profil utilisateur' });
  }
};

// GET /cart
// Obtient le panier d'achat de l'utilisateur
const getUserCart = async (req, res) => {
  const userId = req.userId; // Supposons que l'ID de l'utilisateur est disponible dans l'objet de requête (req.userId)

  try {
    const user = await User.findById(userId).populate('cart.products');
    if (!user) {
      return res.status(404).json({ error: 'Utilisateur introuvable' });
    }
    res.json(user.cart);
  } catch (error) {
    res.status(500).json({ error: 'Échec de récupération du panier' });
  }
};

// PUT /cart
// Ajoute un article au panier d'un utilisateur
const addToCart = async (req, res) => {
  const userId = req.userId; // Supposons que l'ID de l'utilisateur soit disponible dans l'objet de requête (req.userId)
  const { productId } = req.body; // Supposons que l'ID du produit soit fourni dans le corps de la requête

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: 'Utilisateur introuvable' });
    }

    // Vérifier si le produit est déjà dans le panier
    const existingProduct = user.cart.products.find((product) => product.toString() === productId);

    if (existingProduct) {
      return res.status(400).json({ error: 'Le produit est déjà dans le panier' });
    }

    // Ajouter le produit au panier
    user.cart.products.push(productId);
    await user.save();

    res.json(user.cart);
  } catch (error) {
    res.status(500).json({ error: 'Échec de l\'ajout au panier' });
  }
};

// DELETE /cart/:id
// Supprime un article du panier d'un utilisateur
const removeFromCart = async (req, res) => {
  const userId = req.userId; // Supposons que l'ID de l'utilisateur soit disponible dans l'objet de requête (req.userId)
  const { id } = req.params; // Supposons que l'ID du produit à supprimer soit fourni en tant que paramètre dans l'URL

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: 'Utilisateur introuvable' });
    }

    // Vérifier si le produit est présent dans le panier
    const productIndex = user.cart.products.findIndex((product) => product.toString() === id);

    if (productIndex === -1) {
      return res.status(404).json({ error: 'Produit introuvable dans le panier' });
    }

    // Supprimer le produit du panier
    user.cart.products.splice(productIndex, 1);
    await user.save();

    res.json(user.cart);
  } catch (error) {
    res.status(500).json({ error: 'Échec de la suppression du panier' });
  }
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  getCurrentUserProfile,
  getUserCart,
  addToCart,
  removeFromCart
};
