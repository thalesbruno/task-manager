const express = require('express')
require('./db/mongoose')
const userRoute = require('./routes/user')
const taskRoute = require('./routes/task')

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())
app.use(userRoute)
app.use(taskRoute)

app.listen(port, () => console.log(`Server running on port ${port}`))


const jwt = require('jsonwebtoken')

const myFunction = async () => {
  const token = jwt.sign({ _id: 'abc1234' }, 'thisismylearningclass', { expiresIn: '7 days' })
  console.log(token)
  
  const data = jwt.verify(token, 'thisismylearningclass')
  console.log(data)
}

myFunction()