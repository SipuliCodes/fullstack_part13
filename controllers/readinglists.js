const router = require('express').Router()

const { Readinglist } = require('../models')
const { tokenExtractor} = require('../util/middleware')

router.post('/', async (req, res, next) => {
  try {
    const reading = await Readinglist.create(req.body);
    res.json(reading);
  } catch (error) {
    next(error);
  }
})

router.put('/:id', tokenExtractor, async (req, res, next) => {
  try {
    const reading = await Readinglist.findByPk(req.params.id);
    console.log("###")
    console.log(reading)
    console.log('###')
    console.log(req.decodedToken)
    if (reading.dataValues.userId === req.decodedToken.id) {
      reading.read = req.body.read;
      await reading.save()
      res.json(reading)
    } else {
      return res.status(401).end()
    }
  } catch (error) {
    next(error)
  }
})

module.exports = router