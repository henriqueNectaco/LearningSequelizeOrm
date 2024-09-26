const express = require('express')
const router = express.Router()
const UserController = require('../controllers/users')
router.get('/users', UserController.userList)
router.post('/users', UserController.userCreate)
router.get('/user/:id', UserController.findById)
router.get('/user/name/:name', UserController.findByName)
router.post('/res', (req, res) => {
  const all = req.body
  return res.json(
    all)
})
module.exports = router