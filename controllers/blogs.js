const router = require('express').Router()
const Blog = require('../models/blog')

router.get('/', async (req, res) => {
  const blogs = await Blog.findAll()
  res.json(blogs)
})

router.post('/', async (req, res, next) => {
  try {
    const blog = await Blog.create(req.body)
    res.json(blog)
  } catch (error) {
    next(error)
  }
})

router.delete('/:id', async (req, res) => {
  const blog = await Blog.findByPk(req.params.id)
  if (blog) {
    console.log(blog)
    await blog.destroy()
    res.status(204).end()
  } else {
    res.status(404).end()
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