const jwt = require('jsonwebtoken');

// Fonction pour générer un token JWT
const generateToken = (userId) => {
  // Clé secrète pour signer le token
  const secretKey = 'votre_clé_secrète';

  // Configuration du token
  const expiresIn = '1h'; // Le token expire en 1 heure

  // Données à inclure dans le token
  const payload = {
    userId: userId,
  };

  // Génère le token en utilisant les configurations et la clé secrète
  const token = jwt.sign(payload, secretKey, { expiresIn });

  return token;
};

// Middleware pour vérifier l'authentification du token
const verifyToken = (req, res, next) => {
  // Obtient le token du header de la requête
  const token = req.headers.authorization;

  // Vérifie si le token est présent
  if (!token) {
    return res.status(401).json({ message: 'Token d\'authentification non fourni' });
  }

  try {
    // Vérifie et décode le token en utilisant la clé secrète
    const decoded = jwt.verify(token, 'votre_clé_secrète');

    // Ajoute l'ID de l'utilisateur décodé à l'objet de la requête
    req.userId = decoded.userId;

    // Appelle le prochain middleware ou la prochaine route
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Token d\'authentification invalide' });
  }
};

module.exports = {
  generateToken,
  verifyToken,
};


