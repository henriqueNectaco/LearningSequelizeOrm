const User = require('../database/model/User');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const secretKey = process.env.SECRET_KEY;


module.exports = {
    async loginn(req, res) {
        return res.json(req.body)
    },

    async login(req, res) {
        const { email, password } = req.body;
        console.log(req.body)

        const user = await User.findOne({ where: { email, password } });

        if (user) {
            const payload = { id: user.id, email: user.email };

            const token = jwt.sign(payload, secretKey, { expiresIn: '1h' });

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
