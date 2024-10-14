const User = require('../database/model/User');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const secretKey = process.env.SECRET_KEY;


module.exports = {
async loginn(req,res){
    return res.json(req.body)
},

    async login(req, res) {
        const { email, password } = req.body;
console.log(req.body)
        // Encontre o usuário na base de dados
        const user = await User.findOne({ where: { email, password } });

        if (user) {
            // Crie o payload do token, você pode adicionar mais informações se precisar
            const payload = { id: user.id, email: user.email };

            // Gere o token
            const token = jwt.sign(payload, secretKey, { expiresIn: '1h' }); // O token expira em 1 hora

            return res.json({ success: true, user, token });
        } else {
            return res.status(404).json({ message: "User not found" });
        }
    },
    async verifyToken(req, res) {
        const { token } = req.body;

        if (!token) {
            return res.status(400).json({ message: "Token not provided" });
        }

        try {
            // Verifique e decodifique o token
            const decoded = jwt.verify(token, secretKey);
            
            // Procure o usuário no banco de dados usando o ID do token
            const user = await User.findByPk(decoded.id);

            if (user) {
                return res.json({ success: true, user });
            } else {
                return res.status(404).json({ message: "User not found" });
            }
        } catch (err) {
            return res.status(401).json({ message: "Invalid token" });
        }
    },
    

};
