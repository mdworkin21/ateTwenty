const router = require('express').Router()

//API Routes


//Handles 404 Errs
router.use((req, res, next) => {
  const err = new Error('Not Found.')
  err.status = 404
  next(err)
})