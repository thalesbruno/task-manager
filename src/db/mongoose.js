const mongoose = require('mongoose')
const validator = require('validator')

mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api', {
  useNewUrlParser: true,
  useCreateIndex: true
})

const User = mongoose.model('User', {
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

const Task = mongoose.model('Task', {
  description: {
    required: true,
    type: String,
    trim: true
  },
  completed: {
    type: Boolean,
    default: false
  }
})

// // create user

// const user = new User({
//   name: 'Jean      ',
//   email: 'Jn@mail.com',
//   password: 'pass123',
//   age: 29
// })

// user.save()
//   .then(() => console.log(user))
//   .catch((error) => console.error(error))

// // create task

const task = new Task({
  description: 'finish node.js course'
})

task.save()
  .then(() => console.log(task))
  .catch((error) => console.error(error))
