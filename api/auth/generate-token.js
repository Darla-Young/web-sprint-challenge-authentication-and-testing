const JWT_SECRET = require('../secrets')
const jwt = require('jsonwebtoken')

module.exports = function generateToken(user) {
  const payload = {
    subject: user.id,
    username: user.username,
  }
  const options = {
    expiresIn: '1d',
  }

  return jwt.sign(payload, JWT_SECRET, options)
}