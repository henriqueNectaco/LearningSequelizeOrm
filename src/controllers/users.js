const User = require('../database/model/User');
const { Op, Sequelize } = require('sequelize');
require('dotenv').config();
const masterPassword=process.env.MASTER_PASSWORD
module.exports = {
  async userUpdate(req, res) {
    try {
      const { id } = req.body;
      const { name } = req.body;
  
      
      const user = await User.findByPk(id); 
  if (!user) {
        return res.status(404).json({ message: "Usuário não encontrado" });
      }
  
      
      await user.update({ name });
  return res.json(user);
    } catch (error) {
       return res.status(500).json({ message: "Erro ao atualizar o usuário", error: error.message });
    }
  }
,  
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
    console.log(req.body)
    try {
      const { name, email,password } = req.body; // Extraindo os dados do corpo da requisição
      const user = await User.create({ name, email,password }); // Criação do novo usuário
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
  },


  async findByDate(req, res) {
    const { date } = req.params;
  
    try {
      const users = await User.findAll({
        where: Sequelize.where(Sequelize.fn('DATE', Sequelize.col('created_at')), date) // Usar 'created_at' em vez de 'createdAt'
      });
  if(users.length > 0){
    return res.json(users);
  } else{
    return res.json({message:"no users found"})
  }
      
    } catch (error) {
      console.error('Error fetching users by date:', error); // Log do erro
      return res.status(500).json({ error: error, "body": req.body }); // Resposta de erro
    }
  },

  async deleteUser(req,res){
    const {id} = req.params
    const user=await User.findByPk(id)
    const userDeleted=User.destroy({where:{id}})
    if(userDeleted){
      res.json({
        succes:true,
        user
      })
    }
    else{
      res.send('user not found')
    }
  },
  async userDeleteAll(req, res) {
    const {accesPassword} =req.body
    try {
      if(accesPassword == masterPassword){
        const result = await User.destroy({
          where: {},
        })
        if (result === 0) {
          return res.status(404).json({ message: "Nenhum usuário encontrado para deletar." });
        }
    
        return res.status(200).json({ message: `${result} usuário(s) deletado(s) com sucesso.` });
      }else{return res.json({message:"sem Autorização"})}
     ;
  
      // Verifique se algum usuário foi deletado
      
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Erro ao deletar usuários.", error: error.message });
    }
  }
  
};
