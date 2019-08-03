const mongoose = require('mongoose')

mongoose.connect(`mongodb://${process.env.MONGODB_URL}:${process.env.MONGODB_PORT}/${process.env.MONGODB_DBNAME}`, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false
})
