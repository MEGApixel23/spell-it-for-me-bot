const request = require('request')
const mm = require('music-metadata')

class SpeechRecognitionService {
  constructor ({ client, languageCode, encoding, rateOptions }) {
    this.client = client
    this.languageCode = languageCode || 'ru-RU'
    this.encoding = encoding || 'OGG_OPUS'
    this.rateOptions = rateOptions || [8000, 12000, 16000, 24000, 48000]
  }

  async speechToText ({ link }) {
    const { content, sampleRate } = await this.getFileContent(link)
    const requestBody = {
      audio: {
        content
      },
      config: {
        encoding: this.encoding,
        languageCode: this.languageCode,
        sampleRateHertz: sampleRate
      }
    }
    const [response] = await this.client.recognize(requestBody)

    return response.results
      .map(result => result.alternatives[0].transcript)
      .join('\n')
  }

  async getFileContent (url) {
    return new Promise((resolve, reject) => (
      request({ url, encoding: null }, async (err, response, body) => {
        const content = Buffer.from(body, 'utf8').toString('base64')
        const sampleRate = await this.getSampleRate(body)

        if (err) {
          return reject(err)
        }

        return resolve({ content, sampleRate })
      })
    ))
  }

  async getSampleRate (body) {
    const { format: { sampleRate } } = await mm.parseBuffer(body)

    for (let i = 0; i < this.rateOptions.length; i++) {
      if (sampleRate === this.rateOptions[i]) {
        return sampleRate
      }

      if (sampleRate < this.rateOptions[i]) {
        return this.rateOptions[i]
      }
    }

    return 0
  }
}

module.exports = SpeechRecognitionService
