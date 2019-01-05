require('dotenv').config({ path: `${__dirname}/../.env` })

module.exports = {
  telegramToken: process.env.TELEGRAM_TOKEN,
  mysql: {
    DB_HOST: process.env.DB_HOST,
    DB_USER: process.env.DB_USER,
    DB_PASS: process.env.DB_PASS,
    DB_NAME: process.env.DB_NAME
  },
  migration: {
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: 'mysql'
  }
}
