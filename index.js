const {app} = require('./server')
const PORT = process.env.PORT || 3000
const {db} = require('./server/db')
const {sessionStore} = require('./server')


//Put in {force: true} to update heroku db
 db.sync()
  .then (() => {
    console.log('session synced')
    sessionStore.sync()})
  .then(() => {
    console.log('db synced')
    app.listen(PORT, () => {
      console.log('Listen\'n on PORT: ', PORT)
    })
  }) 