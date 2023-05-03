const AuthService = require('../service/authService.js')

class AuthController {
  // [POST] /auth/register
  async register(req, res, next) {
    return AuthService.register(req, res, next)
  }

  // [GET] /auth/login
  async login(req, res, next) {
    return AuthService.login(req, res, next)
  }
}

module.exports = new AuthController()
