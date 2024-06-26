const router = require('express').Router()

const { User, Blog } = require('../models')
const {Op} = require('sequelize')

router.get('/', async (req, res) => {
  const users = await User.findAll({
    include: {
      model: Blog,
      attributes: ['title', 'author']
    }
  })
  res.json(users)
})

router.post('/', async (req, res, next) => {
  try {
    const user = await User.create(req.body)
    res.json(user)
  } catch (error) {
    next(error)
  }
})

router.put('/:username', async (req, res, next) => {
  try {
    const user = await User.findOne({ where: { username: req.params.username } })
    user.username = req.body.username
    user.save()
    res.json(user)
  } catch (error) {
    next(error)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    let read = {
      [Op.in]: [true, false]
    }

    if (req.query.read) {
      read = req.query.read === "true"
    }
    const user = await User.findByPk(req.params.id, {
      attributes: { exclude: ["id", "createdAt", "updatedAt"] },
      include: [
        {
          model: Blog,
          as: "readings",
          attributes: { exclude: ["createdAt", "updatedAt", "userId"] },
          through: {
            attributes: ["read", "id"],
            where: {
              read,
            },
          },
        },
      ],
    });
    res.json(user)
  }
  catch (error) {
    next(error)
  }
})

module.exports = router