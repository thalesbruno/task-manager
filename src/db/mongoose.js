const mongoose = require('mongoose')

const dbConnect = async () => {
  try {
    await mongoose.connect(`mongodb://${process.env.MONGODB_URL}:${process.env.MONGODB_PORT}/${process.env.MONGODB_DBNAME}`, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false
    })
  } catch(error) {
    console.error(error)
  }
}

const dbConnectHeroku = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false
    })
  } catch(error) {
    console.error(error)
  }
}


if (process.env.MONGODB_DBNAME) {
  dbConnect()
} else {
  dbConnectHeroku()
}