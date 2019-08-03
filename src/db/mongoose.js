const mongoose = require('mongoose')

mongoose.connect(`mongodb://${process.env.MONGODB_URL}:${process.env.MONGODB_PORT}/task-manager-api`, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false
})
