const { findUser } = require('../auth/auth-model')
const bcrypt = require('bcryptjs')

async function validateReq (req, res, next) {
  const { username, password } = req.body

  if (!username || !password) {
    res.status(400).json({message: 'username and password required'})
  }
  else {
    const user = await findUser(username)

    if (req.originalUrl === '/api/auth/login') {
      const credentials = {
        username: username,
        password: password
      }
      if (!user || !bcrypt.compareSync(credentials.password, user.password)) {
        return res.status(401).json({message: 'invalid credentials'})
      }
      else next()
    }
    else if (req.originalUrl === '/api/auth/register' && !user) next()
    else res.status(409).json({message: 'username taken'})
  }
}

module.exports = {
  validateReq,
}