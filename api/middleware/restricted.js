const jwt = require('jsonwebtoken')
const { JWT_SECRET } = require ('../secrets')

module.exports = (req, res, next) => {
  const token = req.headers.authorization

  if (!token) {
// On missing token in the Authorization header, the response body should include a string exactly as follows: "token required".
    res.status(401).json({message: 'token required'})
  }
  else if (token.split('.').length !== 3) { // or is expired ???
// On invalid or expired token in the Authorization header, the response body should include a string exactly as follows: "token invalid".
    res.status(401).json({message: 'token invalid'})
  }
  else {
// On valid token in the Authorization header, call next.
    req.decoded = jwt.verify(token, JWT_SECRET)
    next()
  }
};
