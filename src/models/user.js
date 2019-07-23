const mongoose = require('mongoose')
const validator = require('validator')

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    validate(value) {
      if (!validator.isEmail(value)) throw new Error('e-mail is invalid')
    }
  },
  password: {
    type: String,
    required: true,
    trim: true,
    minlength: 6,
    validate(value) {
      if (value.includes("password")) throw new Error("Password cannot contain 'password' string")
    }
  },
  age: {
    type: Number,
    min: 0
  }
})

userSchema.pre('save', async function(next) {
  const user = this

  console.log('just before saving')

  next()
})

const User = mongoose.model('User', userSchema)

module.exports = User