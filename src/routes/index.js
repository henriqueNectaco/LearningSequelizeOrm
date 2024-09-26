const express = require('express')
const router = express.Router()
const UserController = require('../controllers/users')
router.get('/users', UserController.userList)


router.post('/res', (req, res) => {
  const all = req.body
  return res.json(
    all)
})
module.exports = router