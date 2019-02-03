const Extra = require('telegraf/extra')
const Markup = require('telegraf/markup')

const { selectLanguage } = require('../i18n/messages.ru')
const { availableLanguages } = require('../config/config')

const buttons = availableLanguages.map(([name, code]) => Markup.callbackButton(name, `setLanguage.${code}`))
const keyboard = Markup.inlineKeyboard(buttons).oneTime(true)
const markup = Extra.markup(keyboard)

class LanguageCommandHandler {
  process ({ reply }) {
    reply(selectLanguage, markup)
  }
}

module.exports = LanguageCommandHandler
