const SpeechRecognitionService = require('./services/SpeechRecognitionService')

const filePath = `${__dirname}/resources/file_1.oga`

new SpeechRecognitionService().speechToText(filePath)
  .then(console.log)
  .catch(console.error)