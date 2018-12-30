require('dotenv').config({ path: `${__dirname}/../.env` })

module.exports = {
  telegramToken: process.env.TELEGRAM_TOKEN
}
