const Telegram = require('telegraf/telegram')
const speech = require('@google-cloud/speech')

const messages = require('./../i18n/messages.ru')
const StorageService = require('./../services/StorageService')
const SpeechRecognitionService = require('./../services/SpeechRecognitionService')

const speechClient = new speech.SpeechClient({
  keyFilename: `${__dirname}/../config/service-account.json`
})
const speechRecognitionService = new SpeechRecognitionService({ client: speechClient })

class VoiceMessageHandler {
  constructor ({ telegramToken, logger, s3Config }) {
    this.telegramApi = new Telegram(telegramToken)
    this.logger = logger
    this.s3Config = s3Config
    this.storageService = new StorageService(this.s3Config)
  }

  async process (ctx) {
    try {
      const fileId = ctx.update.message.voice.file_id
      const {
        username,
        first_name: firstName,
        last_name: lastName
      } = ctx.update.message.chat

      this.telegramApi.sendChatAction(ctx.chat.id, 'typing')

      const link = await this.telegramApi.getFileLink(fileId)
      const result = await speechRecognitionService.speechToText({ link })
      const response = result || messages.voiceRecognitionFailure

      this.logger.info({ fileId, response, username, firstName, lastName })

      ctx.reply(response)
      this.storageService.storeVoice(link, 'test.ogg')
        .catch(e => this.logger.error(e))
    } catch (e) {
      ctx.reply(messages.error)
      throw e
    }
  }
}

module.exports = VoiceMessageHandler
