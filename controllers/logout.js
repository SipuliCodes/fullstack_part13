const router = require('express').Router()

const { Session } = require('../models')
const { tokenExtractor, sessionCheck } = require('../util/middleware')

router.delete('/:id', tokenExtractor, sessionCheck, async (req, res, next) => {
  try {
    const session = await Session.findOne({
      where: {
        userId: req.params.id,
        token: req.get("authorization").substring(7)
      }
    })
    await session.destroy();
    res.status(204).end();
    
  } catch (error) {
    next(error);
  }
})

module.exports = router