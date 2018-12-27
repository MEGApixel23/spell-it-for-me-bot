const Telegraf = require('telegraf')
const Telegram = require('telegraf/telegram')
const { telegramToken } = require('./config/config')

const bot = new Telegraf(telegramToken)
const telegramApi = new Telegram(telegramToken)

bot.start(ctx => ctx.reply('Hello, there!'))
bot.help(ctx => ctx.reply('Send me a sticker'))
bot.on('sticker', ctx => ctx.reply('👍'))
bot.on('audio', (ctx) => {
  const t = 1
  return ctx.reply('Audio received')
})
bot.on('voice', async (ctx) => {
  const fileId = ctx.update.message.voice.file_id
  const ts = await telegramApi.getFileLink(fileId)
  return ctx.reply('Voice received')
})
bot.hears('hi', ctx => ctx.reply('Hey there'))
bot.startPolling()
