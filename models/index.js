const Blog = require('./blog')
const User = require('./user')
const Readinglist = require('./readinglist')
const Session = require('./session')

User.hasMany(Blog, {foreignKey: 'userId'})
Blog.belongsTo(User, { foreignKey: 'userId' })

User.hasOne(Session, { foreignKey: 'userId' })
Session.belongsTo(User, {foreignKey: 'userId'})

User.belongsToMany(Blog, { through: Readinglist, as: 'readings' })
Blog.belongsToMany(User, { through: Readinglist, as: 'users_readings' })

module.exports = {
  Blog, User, Readinglist, Session
}