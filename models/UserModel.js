const Sequelize = require('sequelize')

const db = require('./../services/Db')

const User = db.define('user', {
  firstName: {
    type: Sequelize.STRING
  },
  lastName: {
    type: Sequelize.STRING
  },
  languageCode: {
    type: Sequelize.STRING
  },
  username: {
    type: Sequelize.STRING
  },
  telegramId: {
    type: Sequelize.STRING
  },
  raw: {
    type: Sequelize.JSON
  },
  selectedLanguageCode: {
    type: Sequelize.STRING
  }
}, {
  charset: 'utf8',
  collate: 'utf8_unicode_ci'
})

module.exports = User
