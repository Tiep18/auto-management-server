const express = require('express')
const userController = require('../controllers/userController.js')
const veryfyToken = require('../middlewares/verifyToken.js')

const userRoutes = express.Router()

userRoutes.use(veryfyToken)

userRoutes.post('/create', userController.create)
userRoutes.delete('/:id', userController.delete)
userRoutes.put('/:id', userController.update)
userRoutes.get('/:id', userController.showDetail)
userRoutes.get('/', userController.showAll)

module.exports = userRoutes
