const express = require('express')
const router = express.Router()
router.get('/', (req, res) => {
  return res.json({ hello: 'heloo' })
})

router.post('/res', (req, res) => {
  const email = req.body.email
  const password = req.body.password
  const date = req.body.date
  return res.json({
    email: email,
    senha: password
  })
})
module.exports = router