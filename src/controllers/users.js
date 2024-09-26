const User = require('../database/model/User')
module.exports = {
  async userList(req, res) {
    const users = User.findAll()
    return res.json(users)
  }
}