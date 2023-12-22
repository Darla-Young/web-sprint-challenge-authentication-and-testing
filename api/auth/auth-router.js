const router = require('express').Router()
const { addUser } = require('./auth-model')
const { validateReq } = require('../middleware/mw')
const bcrypt = require('bcryptjs')
const generateToken = require('./generate-token')

router.post('/register', validateReq, (req, res, next) => {
  const user = req.body
  const hash = bcrypt.hashSync(user.password, 8)
  user.password = hash

  addUser(user)
    .then(newUser => res.status(201).json(newUser))
    .catch(next)
});

router.post('/login', validateReq, (req, res) => {
  const token = generateToken(req.body)

  res.json({
    message: `welcome, ${req.body.username}`,
    token
  })
});

module.exports = router;
