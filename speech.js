const speech = require('@google-cloud/speech')
const SpeechRecognitionService = require('./services/SpeechRecognitionService')

const link = 'https://api.telegram.org/file/bot721376645:AAH-DOb-V6yYm-ktRfKTKXpaAVdKi8XY6v0/voice/file_25.oga'

new SpeechRecognitionService({ client: new speech.SpeechClient() })
  .speechToText({ link })
  .then(console.log)
  .catch(console.error)
