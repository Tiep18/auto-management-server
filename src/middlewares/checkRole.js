function checkRole(req, res, next) {
  const role = req.user.role
  if (role === 'STAFF') return res.status(401).send('You are not an admin')
  next()
}

module.exports = checkRole
