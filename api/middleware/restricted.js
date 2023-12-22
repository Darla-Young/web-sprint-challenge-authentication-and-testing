const jwt = require('jsonwebtoken')
const { JWT_SECRET } = require ('../secrets')

module.exports = (req, res, next) => {
  const token = req.headers.authorization

  if (!token) {
    res.status(401).json({message: 'token required'})
  }
  else if (token.split('.').length !== 3 || !jwt.verify(token, JWT_SECRET)) {
    res.status(401).json({message: 'token invalid'})
  }
  else next()
};
