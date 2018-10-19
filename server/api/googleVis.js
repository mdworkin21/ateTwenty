const vision = require('@google-cloud/vision')
const client = new vision.ImageAnnotatorClient({
  projectId: 'atetwenty-219519',
  keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS
})


