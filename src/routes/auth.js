const express = require('express')
const authController = require('../controllers/authController.js')

const authRoutes = express.Router()

// authRoutes.post('/register', authController.register)
authRoutes.post('/login', authController.login)
authRoutes.post('/refesh', authController.refesh)

module.exports = authRoutes
