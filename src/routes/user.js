const express = require('express')
const userController = require('../controllers/userController.js')
const verifyAccessToken = require('../middlewares/verifyAccessToken.js')
const checkRole = require('../middlewares/checkRole.js')

const userRoutes = express.Router()

userRoutes.use(verifyAccessToken, checkRole)

userRoutes.post('/create', userController.create)
userRoutes.delete('/:id', userController.delete)
userRoutes.put('/:id', userController.update)
userRoutes.get('/:id', userController.showDetail)
userRoutes.get('/', userController.showAll)

module.exports = userRoutes
