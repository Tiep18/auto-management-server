const jwt = require('jsonwebtoken')

function verifyToken(req, res, next) {
  const token = req.header('access-token')
  if (!token) return res.status(401).send('Access denied')

  try {
    const verified = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET_KEY)
    req.user = verified
    next()
  } catch (error) {
    res.status(400).send('Invalid token')
  }
}

module.exports = verifyToken
