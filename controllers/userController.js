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

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser
};
