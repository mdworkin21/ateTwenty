const router = require('express').Router()
const Profile = require('../db/models/Profile')

//Route not complete
router.post('/', async (req, res, next) => {
  console.log("REARERAE", req.body)
  try{
    const addedGoals = await Profile.create({
      calGoal: Number(req.body.dailyGoals.calories),
      proteinGoal: Number(req.body.dailyGoals.protein),
      carbGoal: Number(req.body.dailyGoals.carb),
      fatGoal: Number(req.body.dailyGoals.fat),
      userId: req.body.dailyGoals.userId
    })
    res.status(201).send(addedGoals)
  } catch(err) {
     next(err)
  }
})


module.exports = router 