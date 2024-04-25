require('dotenv').config()

const PORT = process.env.PORT | 3003
const DATABASE_URL = process.env.DATABASE_URL

module.exports = {
  PORT,
  DATABASE_URL
}