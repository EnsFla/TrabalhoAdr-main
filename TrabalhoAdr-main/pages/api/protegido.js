import { validateToken } from '../../lib/middleware/validateToken';

export default async function handler(req, res) {
  // Aplica o middleware de validação do token
  validateToken(req, res, async () => {
    if (req.method === 'GET') {
      // Se o token for válido, retorna os dados protegidos
      return res.status(200).json({ message: 'Acesso permitido', user: req.user });
    }

    // Se o método não for GET
    return res.status(405).json({ message: 'Método não permitido.' });
  });
}
