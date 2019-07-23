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

const bcrypt = require('bcryptjs')

const myFunction = async () => {
  const password = 'Red1234!'
  const hashedPassword = await bcrypt.hash(password, 8)
  const hashedPassword2 = await bcrypt.hash(password, 8)
  
  console.log(password)
  console.log(hashedPassword)
  console.log(hashedPassword2)

  const isMatch = await bcrypt.compare('red1234!', hashedPassword)
  console.log(isMatch)
}

myFunction()