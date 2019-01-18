// const speech = require('@google-cloud/speech')
// const SpeechRecognitionService = require('./services/SpeechRecognitionService')
// const { telegramToken } = require('./config/config')

// const link = `https://api.telegram.org/file/bot${telegramToken}/voice/file_25.oga`
//
// new SpeechRecognitionService({ client: new speech.SpeechClient() })
//   .speechToText({ link })
//   .then(console.log)
//   .catch(console.error)

const db = require('./models/UserModel')

