const { languageChanged } = require('../i18n/messages.ru')
const UserModel = require('./../models/UserModel')

class ChangeLanguageHandler {
  process ({ reply, match, from, deleteMessage }) {
    const code = match && match[1]
    const telegramId = from.id

    deleteMessage()
    reply(languageChanged)

    return UserModel.update({ selectedLanguageCode: code }, { where: { telegramId } })
  }
}

module.exports = ChangeLanguageHandler
