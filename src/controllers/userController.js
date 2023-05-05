const User = require('../models/User.js')

class UserController {
  // [GET] api/users
  async showAll(req, res) {
    try {
      const users = await User.find({})
      res.status(200).json(users)
    } catch (error) {
      res.status(500).send(error.message)
    }
  }

  // [GET] api/users/:id
  async showDetail(req, res) {
    const id = req.params.id
    try {
      const user = await User.findOne({ _id: id })
      res.status(200).json(user)
    } catch (error) {
      res.status(500).send(error.message)
    }
  }

  // [POST] api/users/create
  async create(req, res) {
    try {
      const user = new User(req.body)
      await user.save()
      res.status(200).json({
        fullname: user.fullName,
        username: user.username,
        role: user.role,
      })
    } catch (error) {
      res.status(500).send(error.message)
    }
  }

  // [UPDATE] api/users/:id
  async update(req, res) {
    const id = req.params.id
    try {
      const newUser = await User.updateOne({ _id: id }, req.body)
      res.status(200).json({
        fullname: newUser.fullName,
        username: newUser.username,
        role: newUser.role,
      })
    } catch (error) {
      res.status(500).send(error.message)
    }
  }

  // [DELETE] api/users/:id
  async delete(req, res) {
    const id = req.params.id
    try {
      await User.deleteOne({ _id: id })
      res.status(200).redirect('/api/users')
    } catch (error) {
      res.status(500).send(error.message)
    }
  }
}

module.exports = new UserController()
