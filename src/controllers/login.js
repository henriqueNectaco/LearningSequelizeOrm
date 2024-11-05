const Session = require('../database/model/Session');
const User = require('../database/model/User');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const secretKey = process.env.SECRET_KEY;

function gerarOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}
module.exports = {


  async login(req, res) {
    const { email, password } = req.body;
    console.log(req.body)

    const user = await User.findOne({ where: { email, password } });

    if (user) {
      const payload = { id: user.id, email: user.email };
      const twoFaCode = gerarOTP()
      const token = jwt.sign(payload, secretKey, { expiresIn: '1h' });
      const session = await Session.create({
        acess_token: twoFaCode,
        jwt_token: token,
        user_id: user.id
      })
      return res.json({ success: true, session });
    } else {
      return res.status(404).json({ message: "User not found" });
    }
  },
  async verifyTwoFactory(req, res) {
    const { userId, acess_token } = req.body;

    try {
      // Corrigido para `findByPk(userId)` que busca um usuário pelo ID primário diretamente
      const user = await User.findByPk(userId);

      if (!user) {
        return res.status(404).json({ message: "Usuário não encontrado" });
      }
      const newDate = new Date();
      const dateLimit = new Date(newDate.getTime() + 5 * 60 * 1000);
      // Verifica a sessão com o token de acesso
      const verifyAcess = await Session.findOne({ where: { user_id: userId, acess_token, created_at: { $lt: dateLimit } } });

      if (!verifyAcess) {
        return res.status(401).json({ message: "Token de acesso inválido ou não encontrado", dateLimit, newDate });
      }

      // Retorna a sessão se válida
      return res.json(verifyAcess);
    }
    catch (error) {
      // Retorna uma resposta de erro caso ocorra uma exceção
      console.error("Erro ao verificar a autenticação de dois fatores:", error);
      return res.status(500).json({ message: "Erro no servidor, tente novamente mais tarde" });
    }
  }
  ,
  async verifyToken(req, res) {
    const { token } = req.body;

    if (!token) {
      return res.status(400).json({ message: "Token not provided" });
    }

    try {
      const decoded = jwt.verify(token, secretKey);
      const user = await User.findByPk(decoded.id);

      if (user) {
        const { createdAt, updatedAt, ...userData } = user.toJSON();

        return res.json({ success: true, user: { ...userData, token } });
      } else {
        return res.status(404).json({ message: "User not found" });
      }
    } catch (err) {
      return res.status(401).json({ message: "Invalid token" });
    }
  }



};
