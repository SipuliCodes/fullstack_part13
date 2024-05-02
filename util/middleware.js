const { Sequelize } = require('sequelize')
const jwt = require("jsonwebtoken");

const { SECRET } = require("../util/config");

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

const tokenExtractor = (req, res, next) => {
  const authorization = req.get("authorization");
  if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
    try {
      req.decodedToken = jwt.verify(authorization.substring(7), SECRET);
    } catch (error) {
      console.log(error);
      next(error);
    }
  } else {
    return res.status(401).json({ error: "token missing" });
  }
  next();
};


module.exports = {errorHandler, tokenExtractor}