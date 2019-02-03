const Telegraf = require('telegraf')

const logger = require('./services/Logger')
const messages = require('./i18n/messages.ru')
const VoiceMessageHandler = require('./handlers/VoiceMessageHandler')
const IncomeMessageHandler = require('./handlers/IncomeMessageHandler')
const LanguageCommandHandler = require('./handlers/LanguageCommandHandler')
const ChangeLanguageHandler = require('./handlers/ChangeLanguageHandler')
const { telegramToken, s3: s3Config } = require('./config/config')
const { version } = require('./package.json')

const incomeMessageHandler = new IncomeMessageHandler({ logger })
const voiceMessageHandler = new VoiceMessageHandler({ telegramToken, logger, s3Config })
const languageCommandHandler = new LanguageCommandHandler()
const changeLanguageHandler = new ChangeLanguageHandler()

const bot = new Telegraf(telegramToken)

bot.use((ctx, next) => incomeMessageHandler.process(ctx, next))
bot.start(({ reply }) => reply(messages.hello))
bot.help(({ reply }) => reply(messages.sendMeASticker))

bot.on('sticker', ctx => ctx.reply(messages.stickerSent))
bot.on('voice', ctx => voiceMessageHandler.process(ctx))

bot.command('version', ({ reply }) => reply(version))
bot.command('language', ctx => languageCommandHandler.process(ctx))

bot.action(/^setLanguage.([a-zA-Z-]+)$/, ctx => changeLanguageHandler.process(ctx))

bot.catch(err => logger.error(err))
bot.startPolling()
