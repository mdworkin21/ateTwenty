const router = require('express').Router()
const User = require('../db/models/User')

//Checks to see if user exists in db, and whether pw is correct. 

router.post('/checkUser', async (req, res, next) => {
  try{
    const user = await User.findOne({
      where: {
        email: req.body.email
      }
    }) 
    
    if(!user){
      res.status(401).send('Wrong username and/or password')
    } else if (user.password !== req.body.password) {
      res.status(401).send('Wrong username and/or password')
    } else {
      //HERE"S THE MOD
      // console.log(req.session.passport)
      // req.session.passport.user = user
      req.login(user, err => (err ? next(err) : res.json(user)))
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


router.delete('/logout', async(req, res, next) => {
  try{
    req.logOut()
    req.session.destroy()
  }catch(err){
    next(err)
  }
})

module.exports = router 