const router = require('express').Router()

const { Readinglist } = require('../models')

router.post('/', async (req, res, next) => {
  try {
    const reading = await Readinglist.create(req.body);
    res.json(reading);
  } catch (error) {
    next(error);
  }
})

module.exports = router