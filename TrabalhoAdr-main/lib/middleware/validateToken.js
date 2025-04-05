import jwt from 'jsonwebtoken';

export const validateToken = (req, res, next) => {
  const token = req.cookies.token; // Obtém o token do cookie

  if (!token) {
    return res.status(401).json({ message: 'Token não encontrado. Acesso negado.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Valida o token
    req.user = decoded; // Armazena as informações do usuário decodificadas no req.user
    next(); // Passa para a próxima rota se o token for válido
  } catch (error) {
    console.error(error);
    return res.status(401).json({ message: 'Token inválido ou expirado. Acesso negado.' });
  }
};
