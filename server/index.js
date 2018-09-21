const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const path = require('path')
const app = express()

//Logging Middleware
app.use(morgan('dev'))

//BodyParsing Middleware
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

//Static Middleware
app.use(express.static(path.join(__dirname, '..', '/client/public')))

//Route to APIs
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

module.exports = app