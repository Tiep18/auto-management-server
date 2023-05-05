const mongoose = require('mongoose')

const Schema = mongoose.Schema

const ROLES = { admin: 'ADMIN', staff: 'STAFF' }

const User = new Schema(
  {
    fullName: { type: String, required: true },
    username: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, enum: ROLES, default: ROLES.staff, required: true },
  },
  { timestamps: true }
)

module.exports = mongoose.model('User', User)
