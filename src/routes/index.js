const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')
const UserController = require('../controllers/users')
const loginController = require('../controllers/login')


router.get('/users', UserController.userList)
router.put('/user', UserController.userUpdate)
router.post('/userCreate', UserController.userCreate)
router.post('/users', auth, UserController.userCreate)
router.post('/user/acess', loginController.verifyTwoFactory)
router.delete('/deleteAll', UserController.userDeleteAll)


router.get('/user/:id', UserController.findById)
router.get('/users/criados/:date', UserController.findByDate);
router.get('/user/name/:name', UserController.findByName)
router.delete('/user/:id', auth, UserController.deleteUser)
router.post('/login', loginController.login)
router.post('/autenticar', loginController.verifyToken)

module.exports = router