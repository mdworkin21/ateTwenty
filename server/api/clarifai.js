const router = require('express').Router()
const Clarifai = require('clarifai');
const app = new Clarifai.App({
  apiKey: process.env.CLARIFAI_KEY
 })



router.post('/', (req, res, next) => {
  try{
    // console.log('BODYYYYY', req.body)
    app.models.predict("bd367be194cf45149e75f01d59f77ba7", 'https://images-na.ssl-images-amazon.com/images/I/811fGdwqf%2BL._SX355_.jpg').then(
     function(response) {
       res.send(response)
       console.log(response);
     },
     function(err) {
       console.log("IT ERRRRRRED")
       console.error(err);
     }
   );

  } catch(err){
      next(err)
  }
})


module.exports = router 