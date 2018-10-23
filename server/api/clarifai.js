const router = require('express').Router()
const Clarifai = require('clarifai');
const app = new Clarifai.App({
  apiKey: process.env.CLARIFAI_KEY
 })
 
 router.post('/', (req, res, next) => {
   try{
    let sliced = req.body.file.split(',')
    app.models.predict("bd367be194cf45149e75f01d59f77ba7", {base64: sliced[1]}).then(
     function(response) {
       console.log(response);
       res.send(response)
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