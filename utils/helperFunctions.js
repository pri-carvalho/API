// Aqui está o código completo do arquivo helperFunctions.js:
// Essas são funções auxiliares que você pode usar para validar campos, como emails, comprimentos mínimos e máximos de strings, entre outros.

// Função para validar se uma string é um email válido
const validateEmail = (email) => {
    // Expressão regular para validar o formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  
  // Função para validar se uma string possui um mínimo de caracteres
  const validateMinLength = (value, minLength) => {
    return value.length >= minLength;
  };
  
  // Função para validar se uma string possui um máximo de caracteres
  const validateMaxLength = (value, maxLength) => {
    return value.length <= maxLength;
  };
  
  module.exports = {
    validateEmail,
    validateMinLength,
    validateMaxLength,
  };
  