const router = require('express').Router()
const User = require('../db/models/User')


router.put('/checkUser', async (req, res, next) => {
  try{
    const doesUserExist = await User.findOne({
      where: {
        name: req.body.name,
        email: req.body.email
      }
    }) 

    if(doesUserExist){
      res.status(200).send(doesUserExist)
    } else {
      res.sendStatus(404)
    }
  } catch(err){

  }
})


router.post('/newUser', async (req, res, next) => {
  try{
    const newUser = await User.create(req.body)
    res.status(201).send(newUser)
  }catch(err){
    next(err)
  }
})

module.exports = router 