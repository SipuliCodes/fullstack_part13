const { Sequelize } = require('sequelize')
const jwt = require("jsonwebtoken");

const { SECRET } = require("../util/config");
const { Session, User } = require("../models");

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

const sessionCheck = async (req, res, next) => {
  try {
    const session = await Session.findOne({
      where: {
        userId: req.decodedToken.id,
        token: req.get("authorization").substring(7)
      },
      include: {
        model: User
      }
    })
    if (!session || session.user.disabled) {
      return res.status(401).json({ error: "token expired" });
    }
  } catch (error) {
    next(error)
  }
  next()
}

const tokenExtractor = (req, res, next) => {
  const authorization = req.get("authorization");
  if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
    try {
      req.decodedToken = jwt.verify(authorization.substring(7), SECRET);
    } catch (error) {
      next(error);
    }
  } else {
    return res.status(401).json({ error: "token missing" });
  }
  next();
};


module.exports = {errorHandler, tokenExtractor, sessionCheck}