const express = require('express')
require('./db/mongoose')
const userRoute = require('./routes/user')
const taskRoute = require('./routes/task')

const app = express()
const port = process.env.PORT || 3000

// app.use((req, res, next) => {
//   res.status(503).send('Service temporarily unavailable')
// })

app.use(express.json())
app.use(userRoute)
app.use(taskRoute)

app.listen(port, () => console.log(`Server running on port ${port}`))


// const jwt = require('jsonwebtoken')

// const myFunction = async () => {
//   const token = jwt.sign({ _id: 'abc1234' }, 'thisismylearningclass', { expiresIn: '7 days' })
//   console.log(token)
  
//   const data = jwt.verify(token, 'thisismylearningclass')
//   console.log(data)
// }

// myFunction()

const Task = require('./models/task')
const User = require('./models/user')

const main = async () => {
  // const task = await Task.findById('5d3e20a695289f3ac9447933')
  // await task.populate('owner').execPopulate()
  // console.log(task.owner)

  const user = await User.findById('5d3e1f4f153cc63aa6047a21')
  await user.populate('tasks').execPopulate()
  console.log(user.tasks)
}

main()