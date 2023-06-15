const jwt = require('jsonwebtoken');
const User = require('../models/user');

// Fonction pour créer un jeton JWT
const createToken = (userId) => {
  return jwt.sign({ userId }, process.env.SECRET_JWT, {
    expiresIn: '1d',
  });
};

// Middleware pour vérifier si l'utilisateur est authentifié
const requireAuth = async (req, res, next) => {
  const token = req.cookies.jwt;

  // Vérifier si le jeton existe
  if (token) {
    try {
      // Vérifier si le jeton est valide
      const decodedToken = jwt.verify(token, process.env.SECRET_JWT);

      // Trouver l'utilisateur correspondant à l'ID du jeton
      const user = await User.findById(decodedToken.userId);

      // Vérifier si l'utilisateur existe
      if (user) {
        req.user = user; // Stocker l'utilisateur dans l'objet de requête
        next(); // Continuer vers la prochaine fonction de middleware
      } else {
        throw new Error('Utilisateur non trouvé');
      }
    } catch (err) {
      console.error(err);
      res.status(401).json({ message: 'Token invalide' });
    }
  } else {
    res.status(401).json({ message: 'Token non fourni' });
  }
};

module.exports = { createToken, requireAuth };