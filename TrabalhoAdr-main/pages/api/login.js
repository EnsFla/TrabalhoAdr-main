import jwt from 'jsonwebtoken';
import cookie from 'cookie';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      // Vamos criar um token simples sem validação de usuário
      const token = jwt.sign(
        { username: 'testUser' },  // Payload simples
        process.env.JWT_SECRET,    // Certifique-se de que essa variável esteja configurada corretamente
        { expiresIn: '30s' }       // Expiração do token após 30 segundos
      );

      console.log("Token gerado:", token);  // Verifique o token gerado nos logs

      // Configura o cookie com o token JWT
      res.setHeader('Set-Cookie', cookie.serialize('token', token, {
        httpOnly: true,  // O cookie não pode ser acessado via JavaScript
        secure: process.env.NODE_ENV === 'production',  // Só ativa em produção
        maxAge: 30,  // O cookie expira em 30 segundos
        path: '/',  // O cookie é válido para todo o domínio
        sameSite: 'Strict',  // Restringe o envio do cookie a requisições no mesmo domínio
      }));

      // Retorna resposta de sucesso com status 200
      return res.status(200).json({ message: 'Autenticado com sucesso', token: token });
    } catch (error) {
      console.error("Erro ao processar o login:", error);
      return res.status(500).json({ message: 'Ocorreu um erro no servidor. Tente novamente mais tarde.' });
    }
  }

  // Se o método não for POST, retorna erro 405 (Método não permitido)
  return res.status(405).json({ message: 'Método não permitido. Use o método POST.' });
}
