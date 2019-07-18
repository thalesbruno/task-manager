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
  age: {
    type: Number,
    min: 0
  }
})

const Task = mongoose.model('Task', {
  description: {
    type: String
  },
  completed: {
    type: Boolean,
    default: false
  }
})

// const task = new Task({
//   description: 'finish node.js basic course',
//   completed: false
// })

// task.save()
//   .then(() => console.log(task))
//   .catch((error) => console.error(error))

const user = new User({
  name: 'John      ',
  email: 'JOHn@mail.com',
  age: 29
})

user.save()
  .then(() => console.log(user))
  .catch((error) => console.error(error))