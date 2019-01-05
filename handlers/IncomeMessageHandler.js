const UserModel = require('./../models/UserModel')

class IncomeMessageHandler {
  constructor ({ logger }) {
    this.logger = logger
  }

  async process (ctx, next) {
    next()

    let user
    this.logger.debug(ctx.update.message)

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
  }
}

module.exports = IncomeMessageHandler
