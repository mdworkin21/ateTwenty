const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const path = require('path')
const session = require('express-session')
const passport = require('passport')
const db = require('./db/database')
const SequelizeStore = require('connect-session-sequelize')(session.Store)
const sessionStore = new SequelizeStore({db})
const app = express()
const User = require('./db/models/User')


/**
 * In your development environment, you can keep all of your
 * app's secret API keys in a file called `secrets.js`, in your project
 * root. This file is included in the .gitignore - it will NOT be tracked
 * or show up on Github. On your production server, you can add these
 * keys as environment variables, so that they can still be read by the
 * Node process on process.env (This paragraph is from BoilerMaker)
 */

if (process.env.NODE_ENV !== 'production') require('../secrets')


// passport registration
passport.serializeUser((user, done) => 
done(null, user.id))

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id)
    done(null, user)
  } catch (err) {
    done(err)
  }
})
//Logging Middleware
app.use(morgan('dev'))

//BodyParsing Middleware
app.use(bodyParser.json({limit: '50mb'}))
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}))

//Session middleware with passport
app.use(session({
  cookieName: 'session',
  secret: process.env.SESSION_SECRET || '80/20',
  store: sessionStore,
  resave: false,
  saveUninitialized: false
}))

app.use(passport.initialize())
app.use(passport.session())

//Static Middleware
app.use(express.static(path.join(__dirname, '..', '/client/public')))

//Route to APIs
app.use('/authenticate', require('./authenticate'))
app.use('/api', require('./api'))

//Static HTML For When No API Route Matches (Do I need this?)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', '/client/public/'))
})

//Handles 500 Errs
app.use((err, req, res, next) => {
  console.error(err);
  console.error(err.stack);
  res.status(err.status || 500).send(err.message || 'Internal Server Err. Whoops!')
})

module.exports = {app, sessionStore}