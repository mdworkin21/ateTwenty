const db = require('./database')
const Profile = require('./models/Profile')
const DailyLog = require('./models/DailyLog')
const User = require('./models/User')
const Sequelize = require('sequelize')

//Define your associations here
Profile.belongsTo(User)
User.hasOne(Profile)

User.hasOne(DailyLog)
DailyLog.belongsToMany(User, {through: 'userLog'})


module.exports = {
  db,
  Profile,
  DailyLog,
  User
}