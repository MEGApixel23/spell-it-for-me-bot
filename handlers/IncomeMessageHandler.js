const UserModel = require('./../models/UserModel')
const MessageModel = require('./../models/MessageModel')

class IncomeMessageHandler {
  constructor ({ logger }) {
    this.logger = logger
  }

  async process (ctx, next) {
    next()
    this.logger.debug(ctx.update.message)

    return Promise.all([
      this.createUserIfNotExist(ctx.from),
      this.storeMessage(ctx.message || ctx.callbackQuery)
    ])
  }

  async createUserIfNotExist (userData) {
    const {
      id: telegramId,
      first_name: firstName,
      last_name: lastName,
      language_code: languageCode,
      username
    } = userData
    const user = await UserModel.findOne({
      where: { telegramId }
    })

    if (user) {
      return user
    }

    return UserModel.create({
      firstName,
      lastName,
      languageCode,
      username,
      telegramId,
      raw: userData
    })
  }

  async storeMessage (message) {
    return MessageModel.create({
      telegramUserId: message.from.id,
      raw: message
    })
  }
}

module.exports = IncomeMessageHandler
