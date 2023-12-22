const { findUser } = require('../auth/auth-model')

function validateReq (req, res, next) {
  const { username, password } = req.body

  if (!username || !password) res.status(400).json({message: 'username and password required'})
  else {
    console.log(req.originalUrl)
    next()
  }
// if (req.originalUrl === {... '/login'})

/*
  FAILED registration
    `username` exists
    message: "username taken"

  FAILED login
    `username` does not exist || `password` is incorrect
    message: "invalid credentials"
*/
}

module.exports = {
  validateReq,
}