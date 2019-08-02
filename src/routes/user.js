const express = require('express')
const multer = require('multer')
const sharp = require('sharp')
const User = require('../models/user')
const auth = require('../middleware/auth')
const { sendWelcomeEmail } = require('../emails/account')
const router = new express.Router()

router.post('/users', async (req, res) => {
  const user = new User(req.body)

  try {
    await user.save()
    sendWelcomeEmail(user.email, user.name)
    const token = await user.generateAuthToken()
    res.status(201).send({ user, token })
  } catch(error) {
    res.status(400).send(error)
  }
})

router.post('/users/login', async (req, res) => {
  try {
    const user = await User.findByCredentials(req.body.email, req.body.password)
    const token = await user.generateAuthToken()
    res.send({ user, token })
  } catch(error) {
    res.status(400).send({error}) // check why this catch error is not catching the Error message from findByCredentials
  }
})

router.post('/users/logout', auth, async (req, res) => {
  try {
    // removing only the actual session token
    req.user.tokens = req.user.tokens.filter((token) => token.token !== req.token)
    await req.user.save()
    res.send({ message: 'Sucessfully logged out' })
  } catch(error) {
    res.status(500).send({ error: 'Error on logging out' })
  }
})

router.post('/users/logoutAll', auth, async (req, res) => {
  try {
    // removing all session tokens
    req.user.tokens = []
    await req.user.save()
    res.send({ message: 'Successfully logged out from all sessions' })
  } catch(error) {
    res.status(500).send({ error: 'Error on logging out' })
  }
})

router.get('/users', async (req, res) => {
  try {
    const users = await User.find()
    res.send(users)
  } catch(error) {
    res.send(error)
  }
})

router.get('/users/me', auth, async (req, res) => {
  res.send(req.user)
})

// router.get('/users/:id', async (req, res) => {
//   const _id = req.params.id

//   try {
//     const user = await User.findById(_id)
//     if (!user) return res.status(404).send()
//     res.send(user)
//   } catch(error) {
//     res.status(500).send(error)
//   }
// })

router.patch('/users/me', auth, async (req, res) => {
  const updates = Object.keys(req.body)
  const allowedUpdates = ['name', 'email', 'password', 'age']
  const isValidRequest = updates.every((update) => allowedUpdates.includes(update))
  
  if (!isValidRequest) return res.status(400).send({error: 'Invalid update request.'})
  
  try {
    updates.forEach((update) => req.user[update] = req.body[update])
    await req.user.save()
    res.send(req.user)
  } catch(error) {
    res.status(400).send(error)
  }
})

// router.patch('/users/:id', async (req, res) => {
//   const updates = Object.keys(req.body)
//   const allowedUpdates = ['name', 'email', 'password', 'age']
//   const isValidRequest = updates.every((update) => allowedUpdates.includes(update))

//   if (!isValidRequest) return res.status(400).send({error: 'Invalid update request.'})

//   try {
//     // the method findByIdAndUpdate bypasses mongoose, so we can't use middleware
//     // this is why we are using finById
//     const user = await User.findById(req.params.id)
//     if (!user) return res.status(404).send({ message: 'User not found' })
//     updates.forEach((update) => user[update] = req.body[update])
//     await user.save()
//     res.send(user)
//   } catch(error) {
//     res.status(400).send(error)
//   }
// })

// router.delete('/users/:id', async (req, res) => {
//   try {
//     const user = await User.findByIdAndDelete(req.params.id)
//     if (!user) return res.status(404).send({ message: 'User not found' })
//     res.send(user)
//   } catch (error) {
//     res.status(500).send(error)
//   }
// })

router.delete('/users/me', auth, async (req, res) => {
  try {
    await req.user.remove()
    res.send(req.user)
  } catch (error) {
    res.status(500).send(error)
  }
})

const upload = multer({
  // dest: 'images/avatars',
  limits: {
    fileSize: 1000000
  },
  fileFilter(req, file, callback) {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      callback(new Error('We only accept these image files: jpg, jpeg or png'))
    }

    callback(undefined, true)
  }
})

router.post('/users/me/avatar', auth, upload.single('avatar'), async (req, res) => {
  // req.user.avatar = req.file.buffer
  const buffer = await sharp(req.file.buffer).resize({ width: 250, height: 250 }).png().toBuffer()
  req.user.avatar = buffer
  await req.user.save()
  res.send()
}, (error, req, res, next) => {
  res.status(400).send({ error: error.message })
})

router.delete('/users/me/avatar', auth, async (req, res) => {
  try {
    req.user.avatar = undefined
    await req.user.save()
    res.send(req.user)
  } catch (error) {
    res.status(400).send({ error: error.message })
  }
})

router.get('/users/:id/avatar', async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
    if (!user || !user.avatar) {
      throw new Error()
    }
    res.set('Content-type', 'image/png')
    res.send(user.avatar)
  } catch(error) {
    res.status(404).send({ error: error.message })
  }
})

module.exports = router