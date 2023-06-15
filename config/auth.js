

const jwt = require('jsonwebtoken');

// Função para gerar um token JWT
const generateToken = (userId) => {
  // Chave secreta para assinar o token
  const secretKey = 'sua_chave_secreta';

  // Configurações do token
  const expiresIn = '1h'; // Token expira em 1 hora

  // Dados a serem incluídos no token
  const payload = {
    userId: userId,
  };

  // Gera o token com base nas configurações e na chave secreta
  const token = jwt.sign(payload, secretKey, { expiresIn });

  return token;
};

// Middleware para verificar a autenticação do token
const verifyToken = (req, res, next) => {
  // Obtém o token do cabeçalho da requisição
  const token = req.headers.authorization;

  // Verifica se o token está presente
  if (!token) {
    return res.status(401).json({ message: 'Token de autenticação não fornecido' });
  }

  try {
    // Verifica e decodifica o token usando a chave secreta
    const decoded = jwt.verify(token, 'sua_chave_secreta');

    // Adiciona o ID do usuário decodificado ao objeto da requisição
    req.userId = decoded.userId;

    // Chama o próximo middleware ou rota
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Token de autenticação inválido' });
  }
};

module.exports = {
  generateToken,
  verifyToken,
};

// Certifique-se de substituir 'sua_chave_secreta' pela chave secreta real que você deseja usar para assinar e verificar os tokens JWT. Lembre-se de manter essa chave em segredo e não compartilhá-la publicamente.

