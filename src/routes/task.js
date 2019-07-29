const express = require('express')
const Task = require('../models/task')
const auth = require('../middleware/auth')
const router = express.Router()

router.post('/tasks', auth, async (req, res) => {
  const task = new Task({
    ...req.body,
    owner: req.user._id
  })

  try {
    await task.save()
    res.status(201).send(task)
  } catch(error) {
    res.status(400).send(error)
  }
})

router.get('/tasks', auth, async (req, res) => {
  try {
    const match = {}

    if (req.query.completed) {
      match.completed = req.query.completed === 'true'
    }
    
    // const tasks = await Task.find({ owner: req.user._id })
    // res.send(tasks)
    // await req.user.populate('tasks').execPopulate()
    await req.user.populate({
      path: 'tasks',
      match
    }).execPopulate()
    res.send(req.user.tasks)
  } catch(error) {
    res.status(500).send(error)
  }
})

router.get('/tasks/:id', auth, async (req, res) => {
  const _id = req.params.id

  try {
    // const task = await Task.findById(_id)
    const task = await Task.findOne({ _id, owner: req.user._id }) 
    if (!task) return res.status(404).send({message: 'No task with this ID'})
    res.send(task)
  } catch(error) {
    res.status(500).send(error)
  }
})

router.patch('/tasks/:id', auth, async (req, res) => {
  const updates = Object.keys(req.body)
  const allowedUpdates = ['description', 'completed']
  const isValidRequest = updates.every((update) => allowedUpdates.includes(update))

  if (!isValidRequest) return res.status(400).send({ error: 'Invalid update request' })

  try {
    const task = await Task.findOne({ _id: req.params.id, owner: req.user._id })
    if (!task) return res.status(404).send({ message: 'Task not found' })
    updates.forEach((update) => task[update] = req.body[update])
    await task.save()
    res.send(task)
  } catch (error) {
    res.status(500).send(error)
  }
})

router.delete('/tasks/:id', auth, async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({ _id: req.params.id, owner: req.user._id })
    if (!task) return res.status(404).send({ message: 'Task not found' })
    res.send(task)
  } catch (error) {
    res.status(500).send(error)
  }
})

module.exports = router