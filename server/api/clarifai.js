const router = require('express').Router()
const Clarifai = require('clarifai');
const app = new Clarifai.App({
  apiKey: process.env.CLARIFAI_KEY
 })



router.post('/', (req, res, next) => {
  try{
    console.log('BODYYYYY', req.body.dataImg)
    
    app.models.predict(Clarifai.GENERAL_MODEL, {base64: req.body.dataImg}).then(
     function(response) {
       console.log('POOPFACE')
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