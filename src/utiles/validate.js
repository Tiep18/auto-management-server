const Joi = require('joi')

const createValidator = function (data) {
  const schema = Joi.object({
    fullName: Joi.string().min(6).required(),
    username: Joi.string().min(6).required(),
    password: Joi.string().min(6).required(),
    role: Joi.string().required(),
  })

  return schema.validate(data)
}

const loginValidator = function (data) {
  const schema = Joi.object({
    username: Joi.string().min(6).required(),
    password: Joi.string().min(6).required(),
  })

  return schema.validate(data)
}

module.exports = { loginValidator, createValidator }
