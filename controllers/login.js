const jwt = require('jsonwebtoken')
const router = require('express').Router()

const { SECRET } = require('../util/config')
const { User, Session } = require('../models')

router.post('/', async (req, res) => {
  const body = req.body

  const user = await User.findOne({
    where: {
      username: body.username
    }
  })

  const passwordCorrect = body.password === 'secret'

  if (!(user && passwordCorrect)) {
    return res.status(401).json({
      error: 'invalid username or password'
    })
  }

  const userForToken = {
    username: user.username,
    id: user.id
  }

  const token = jwt.sign(userForToken, SECRET)

  const [session, created] = await Session.findOrCreate({
    where: { userId: user.id },
    defaults: {
      token: token
    }
  })

  if (!created) {
    session.token = token
    await session.save()
  }

  res
    .status(200)
    .send({ token, username: user.username, name: user.name })
})

module.exports = router