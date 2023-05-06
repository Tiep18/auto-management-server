const jwt = require('jsonwebtoken')

function verifyToken(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1]

  if (!token) return res.status(401).send('Access denied')

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET_KEY, (err, user) => {
    if (err) return res.status(401).send('Invalid token')
    req.user = user
    next()
  })
}

module.exports = verifyToken
