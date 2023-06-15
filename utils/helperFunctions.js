
// Fonction pour valider si une chaîne de caractères est une adresse e-mail valide
const validateEmail = (email) => {
  // Expression régulière pour valider le format de l'e-mail
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Fonction pour valider si une chaîne de caractères a une longueur minimale
const validateMinLength = (value, minLength) => {
  return value.length >= minLength;
};

// Fonction pour valider si une chaîne de caractères a une longueur maximale
const validateMaxLength = (value, maxLength) => {
  return value.length <= maxLength;
};

module.exports = {
  validateEmail, 
  validateMinLength, 
  validateMaxLength, 
};
