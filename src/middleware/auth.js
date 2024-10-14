const jwt = require('jsonwebtoken');
const User = require('../database/model/User');
require('dotenv').config();

const secretKey = process.env.SECRET_KEY; // A mesma chave secreta usada para gerar o token

const autorizacao = async (req, res, next) => {
    const authHeader = req.headers['authorization'];

    if (!authHeader) {
        return res.status(401).json({ message: "Token not provided" });
    }

    const token = authHeader.split(' ')[1]; // Assume que o token está no cabeçalho Authorization

    if (!token) {
        return res.status(401).json({ message: "Token not provided rsrts" });
    }

    try {
        // Verifique e decodifique o token
        const decoded = jwt.verify(token, secretKey);

        // Procure o usuário no banco de dados usando o ID do token
        const user = await User.findByPk(decoded.id);

        if (user) {
            req.user = user; // Anexa o usuário à requisição para uso posterior
            next(); // Chama o próximo middleware ou controlador
        } else {
            return res.status(404).json({ message: "User not found" });
        }
    } catch (err) {
        return res.status(401).json({ message: "Invalid token" });
    }
};

module.exports = autorizacao;
