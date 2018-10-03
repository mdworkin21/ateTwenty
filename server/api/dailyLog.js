const router = require('express').Router()
const DailyLog = require('../db/models/DailyLog')

/*When there are multiple users you'll need to add a 'where' with user id (and userID should be associated with dailyLog)*/

router.get('/:id', async (req, res, next) => {
  try{
    const allFood = await DailyLog.findAll({
      where : {
        userId: req.params.id
      }
    })
    console.log("HIT BACK", allFood)

    res.status(200).send(allFood)
  } catch(err){
     next(err)
  }
})

router.post('/', async (req, res, next) => {
  try{
    const foodItem = await DailyLog.create(req.body)
    console.log(foodItem)
    res.status(201).send(foodItem)
  }catch(err){
    next(err)
  }
})

router.delete('/:foodId', async(req, res, next) => {
  try{
    await DailyLog.destroy({
      where: {
        id: req.params.foodId
      }
    })
    res.sendStatus(204)
  } catch(err){
     next(err)
  }
})

module.exports = router