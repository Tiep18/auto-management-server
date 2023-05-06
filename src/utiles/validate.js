const Joi = require('joi')

// const registerValidator = function (data) {
//   const schema = Joi.object({
//     fullName: Joi.string().min(6).required(),
//     username: Joi.string().min(6).required(),
//     password: Joi.string().min(6).required(),
//   })

//   return schema.validate(data)
// }

const loginValidator = function (data) {
  const schema = Joi.object({
    username: Joi.string().min(6).required(),
    password: Joi.string().min(6).required(),
  })

  return schema.validate(data)
}

module.exports = { loginValidator }
