const db = require('./database')
const Profile = require('./models/Profile')
const DailyLog = require('./models/DailyLog')

//Define your associations here



module.exports = {
  db,
  Profile,
  DailyLog
}