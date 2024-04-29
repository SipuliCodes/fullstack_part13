const { Sequelize } = require('sequelize')

const errorHandler = (error, req, res, next) => {
  console.log(error.message)


  if (error.name === 'SequelizeDatabaseError') {
    return res.status(400).send({error: 'Some value were wrong'})
  }
  if (error instanceof Sequelize.ValidationError) {
    console.log(12)
    console.log(error)
    return res.status(400).send({ error: error.message });
  }
  if (error.message === 'invalidId') {
    return res.status(400).send({error: 'Not found'})
  }
  if (error instanceof TypeError) {
    return res.status(400).send({error: error.message})
  }

  next(error)
}


module.exports = {errorHandler}