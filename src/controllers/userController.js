const User = require('../models/User.js')

class UserController {
  // [GET] /users
  async showAll(req, res, next) {
    try {
      const users = await User.find({})
      res.json(users)
    } catch (error) {
      next(error)
    }
  }

  // [GET] /users/:id
  async showDetail(req, res, next) {
    const id = req.params.id
    try {
      const user = await User.findOne({ _id: id })
      res.json(user)
    } catch (error) {
      next(error)
    }
  }

  // [POST] /users/create
  async create(req, res, next) {
    try {
      const user = await new User(req.body)
      await user.save()
      res.redirect('/users')
    } catch (error) {
      next(error)
    }
  }

  // [UPDATE] /users/:id
  async update(req, res, next) {
    const id = req.params.id
    try {
      await User.updateOne({ _id: id }, req.body)
      res.redirect('/users')
    } catch (error) {
      next(error)
    }
  }

  // [DELETE] /users/:id
  async delete(req, res, next) {
    const id = req.params.id
    try {
      await User.deleteOne({ _id: id })
      res.redirect('/users')
    } catch (error) {
      next(error)
    }
  }
}

module.exports = new UserController()
