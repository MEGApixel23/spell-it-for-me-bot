const fs = require('fs')
const speech = require('@google-cloud/speech')

class SpeechRecognitionService {
  async speechToText (filePath) {
    // Creates a client
    const client = new speech.SpeechClient()

    // Reads a local audio file and converts it to base64
    const file = fs.readFileSync(filePath)
    const audioBytes = file.toString('base64')

    // The audio file's encoding, sample rate in hertz, and BCP-47 language code
    const audio = {
      content: audioBytes
    }
    const request = {
      audio,
      config: {
        encoding: 'OGG_OPUS',
        languageCode: 'ru-RU',
        sampleRateHertz: 48000
      }
    }

    // Detects speech in the audio file
    const [response] = await client.recognize(request)

    return response.results
      .map(result => result.alternatives[0].transcript)
      .join('\n')
  }
}

module.exports = SpeechRecognitionService
