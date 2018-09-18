const app = require('./server')
const PORT = process.env.PORT || 3000
const {db} = require('./server/db')

db.sync()
  .then(() => {
    console.log('db synced')
    app.listen(PORT, () => {
      console.log('Listen\'n on PORT: ', PORT)
    })
  })