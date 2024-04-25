const { Sequelize } = require('sequelize')

const errorHandler = (error, req, res, next) => {
  console.log(error.message)


  if (error.name === 'SequelizeDatabaseError') {
    return res.status(400).send({error: 'Some value were wrong'})
  }
  if (error instanceof Sequelize.ValidationError) {
    return res.status(400).send({ error: "Something went wrong" });
  }
  if (error.message === 'invalidId') {
    return res.status(400).send({error: 'Not found'})
  }

  next(error)
}


module.exports = {errorHandler}