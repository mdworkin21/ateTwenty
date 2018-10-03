const db = require('./database')
const Profile = require('./models/Profile')
const DailyLog = require('./models/DailyLog')
const Sequelize = require('sequelize')

const {User} = require('./models')
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