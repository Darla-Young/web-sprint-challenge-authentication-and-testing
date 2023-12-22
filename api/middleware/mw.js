const { findUser } = require('../auth/auth-model')

async function validateReq (req, res, next) {
  const { username, password } = req.body

  if (!username || !password) {
    res.status(400).json({message: 'username and password required'})
  }
  else {
    const check = await findUser(username)
    if (req.originalUrl === '/api/auth/login' && !check.password) {
      res.status(401).json({message: 'invalid credentials'})
    }
    else if (req.originalUrl === '/api/auth/register' && check.username) {
      res.status(409).json({message: 'username taken'})
    }
    else next()
  }
}

module.exports = {
  validateReq,
}