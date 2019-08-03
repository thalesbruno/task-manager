require('dotenv').config()
const express = require('express')
require('./db/mongoose')
const userRoute = require('./routes/user')
const taskRoute = require('./routes/task')

const app = express()
const port = process.env.PORT

// app.use((req, res, next) => {
//   res.status(503).send('Service temporarily unavailable')
// })

const multer = require('multer')
const upload = multer({
  dest: 'images',
  limits: {
    fileSize: 1000000
  },
  fileFilter(req, file, callback) {
    if (!file.originalname.match(/\.(pdf|mobi)$/)) {
      callback(new Error('We only accept PDF files!'))
    }
    callback(undefined, true)
  }
})

app.post('/upload', upload.single('upload'), (req, res) => {
  res.send()
}, (error, req, res, next) => {
  res.status(400).send({ error: error.message })
})


app.use(express.json())
app.use(userRoute)
app.use(taskRoute)

app.listen(port, () => console.log(`Server running on port ${port}`))

// const Task = require('./models/task')
// const User = require('./models/user')

// const main = async () => {
  // const task = await Task.findById('5d3e20a695289f3ac9447933')
  // await task.populate('owner').execPopulate()
  // console.log(task.owner)

//   const user = await User.findById('5d3e1f4f153cc63aa6047a21')
//   await user.populate('tasks').execPopulate()
//   console.log(user.tasks)
// }

// main()