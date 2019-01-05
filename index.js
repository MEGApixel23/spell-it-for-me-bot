const Telegraf = require('telegraf')
const Telegram = require('telegraf/telegram')
const speech = require('@google-cloud/speech')

const { telegramToken } = require('./config/config')
const SpeechRecognitionService = require('./services/SpeechRecognitionService')
const logger = require('./services/Logger')
const UserModel = require('./models/UserModel')
const messages = require('./i18n/messages.ru')

const bot = new Telegraf(telegramToken)
const telegramApi = new Telegram(telegramToken)
const speechRecognitionService = new SpeechRecognitionService({ client: new speech.SpeechClient() })

bot.use(async (ctx, next) => {
  next()

  let user
  logger.debug(ctx.update.message)

  const {
    id: telegramId,
    first_name: firstName,
    last_name: lastName,
    language_code: languageCode,
    username
  } = ctx.update.message.from

  user = await UserModel.findOne({
    where: { telegramId }
  })

  if (!user) {
    await UserModel.create({
      firstName,
      lastName,
      languageCode,
      username,
      telegramId,
      raw: ctx.update.message.from
    })
  }
})
bot.start(ctx => {
  ctx.reply(messages.hello)
})
bot.help(ctx => ctx.reply(messages.sendMeASticker))
bot.on('sticker', ctx => ctx.reply(messages.stickerSent))
bot.on('voice', async (ctx) => {
  try {
    const fileId = ctx.update.message.voice.file_id
    const {
      username,
      first_name: firstName,
      last_name: lastName
    } = ctx.update.message.chat

    telegramApi.sendChatAction(ctx.chat.id, 'typing')

    const link = await telegramApi.getFileLink(fileId)
    const result = await speechRecognitionService.speechToText({ link })
    const response = result || messages.voiceRecognitionFailure

    logger.info({ fileId, response, username, firstName, lastName })

    return ctx.reply(response)
  } catch (e) {
    ctx.reply(messages.error)
    throw e
  }
})
bot.catch(err => logger.error(err))
bot.startPolling()
