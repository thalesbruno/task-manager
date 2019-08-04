require('dotenv').config()
const express = require('express')
require('./db/mongoose')
const userRoute = require('./routes/user')
const taskRoute = require('./routes/task')

const app = express()
const port = process.env.PORT

app.get('/', (req, res) => {
  res.send('Server running!')
})

app.use(express.json())
app.use(userRoute)
app.use(taskRoute)

app.listen(port, () => console.log(`Server running on port ${port}`))