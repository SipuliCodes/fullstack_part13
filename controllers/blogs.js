const router = require('express').Router()
const {Op} = require('sequelize')

const { Blog, User } = require('../models')
const { tokenExtractor} = require('../util/middleware')




router.get('/', async (req, res) => {
  where = {}

  if (req.query.search) {
    where = {
      [Op.or]: [
        {
          title: {
            [Op.iLike]: `%${req.query.search}%`,
          },
        },
        {
          author: {
            [Op.iLike]: `%${req.query.search}%`,
          },
        },
      ],
    };
  }

  const blogs = await Blog.findAll({
    attributes: { exclude: ['userId'] },
    include: {
      model: User,
      attributes: ['name']
    },
    where,
    order: [
      ['likes', 'DESC']
    ]
  })
  res.json(blogs)
})

router.post('/', tokenExtractor, async (req, res, next) => {
  try {
    const user = await User.findByPk(req.decodedToken.id)
    const blog = await Blog.create({ ...req.body, userId: user.id, date: new Date() })
    res.json(blog)
  } catch (error) {
    next(error)
  }
})

router.delete('/:id', tokenExtractor, async (req, res, next) => {
  try {
    const blog = await Blog.findByPk(req.params.id)
    if (blog.userId = req.decodedToken.id) {
      await blog.destroy()
      res.status(204).end()
    } else {
      res.status(404).end()
    }
  } catch (error) {
    next(error)
  }
})

router.put('/:id', async (req, res, next) => {
  try {
    const blog = await Blog.findByPk(req.params.id);
    if (blog) {
      blog.likes = req.body.likes
      blog.save()
      res.status(200).json(blog)
    } else {
      throw new Error('invalidId')
    }
  } catch (error) {
    next(error)
  }
  })

module.exports = router