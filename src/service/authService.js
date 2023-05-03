const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/User.js')
const { registerValidator, loginValidator } = require('../utiles/validate.js')

const AuthService = {
  register: async (req, res, next) => {
    // validate the data
    const { error } = registerValidator(req.body)
    if (error) return res.status(400).send(error.details[0].message)

    // hash password
    const salt = await bcrypt.genSalt(10)
    const password = req.body.password.toString()
    const hashedPassword = await bcrypt.hash(password, salt)
    // check if existing username
    const existingUsername = await User.findOne({ username: req.body.username })
    if (existingUsername) return res.status(400).send('username already exists')

    const user = new User({
      fullName: req.body.fullName,
      username: req.body.username,
      password: hashedPassword,
    })

    try {
      const savedUser = await user.save()
      res.status(200).send(savedUser)
    } catch (error) {
      next(error)
    }
  },

  login: async (req, res, next) => {
    // validate the data
    const { error } = loginValidator(req.body)
    if (error) return res.status(400).send(error.details[0].message)

    try {
      // check if username not found
      const exitedUser = await User.findOne({ username: req.body.username })
      if (!exitedUser) return res.status(401).send('Username not found')

      // check if password is not correct
      const isPasswordValid = await bcrypt.compare(
        req.body.password,
        exitedUser.password
      )
      if (!isPasswordValid) return res.status(400).send('Password not correct')

      // create and assign access token and refresh token
      const accessToken = jwt.sign(
        { _id: exitedUser._id },
        process.env.ACCESS_TOKEN_SECRET_KEY,
        { expiresIn: '1h' }
      )
      const refeshToken = jwt.sign(
        { _id: exitedUser._id },
        process.env.ACCESS_TOKEN_SECRET_KEY,
        { expiresIn: '1 day' }
      )

      res.json({
        message: 'Login successful',
        data: { accessToken, refeshToken },
      })
    } catch (error) {
      next(error)
    }
  },
}

module.exports = AuthService
