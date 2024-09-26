const User = require('../database/model/User');

module.exports = {
  async userList(req, res) {
    try {
      const users = await User.findAll(); // Busca todos os usuários
      return res.json(users); // Retorna os usuários encontrados
    } catch (error) {
      console.error('Error fetching users:', error); // Log do erro
      return res.status(500).json({ error: 'Erro ao buscar usuários' }); // Resposta de erro
    }
  },

  async userCreate(req, res) {
    try {
      const { name, email } = req.body; // Extraindo os dados do corpo da requisição
      const user = await User.create({ name, email }); // Criação do novo usuário
      return res.status(201).json(user); // Retorna o usuário criado
    } catch (error) {
      console.error('Error creating user:', error); // Log do erro
      return res.status(400).json({ error: 'Erro ao criar usuário' }); // Resposta de erro
    }
  },
  async findById(req, res) {
    const { id } = req.params
    const user = await User.findByPk(id)

    return res.json(user)
  },
  async findByName(req, res) {
    const { name } = req.params
    const user = await User.findAll({ where: { name } })

    return res.json(user)
  }
};
