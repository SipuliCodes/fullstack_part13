const router = require('express').Router()

const { Readinglist } = require('../models')
const { tokenExtractor, sessionCheck} = require('../util/middleware')

router.post('/', async (req, res, next) => {
  try {
    const reading = await Readinglist.create(req.body);
    res.json(reading);
  } catch (error) {
    next(error);
  }
})

router.put("/:id", tokenExtractor, sessionCheck, async (req, res, next) => {
  try {
    const reading = await Readinglist.findByPk(req.params.id);
    if (reading.dataValues.userId === req.decodedToken.id) {
      reading.read = req.body.read;
      await reading.save();
      res.json(reading);
    } else {
      return res.status(401).end();
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router