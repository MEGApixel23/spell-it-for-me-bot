const Sequelize = require('sequelize')

const db = require('./../services/Db')

module.exports = db.define('recognition', {
  filename: {
    type: Sequelize.STRING
  },
  text: {
    type: Sequelize.TEXT
  },
  telegramUserId: {
    type: Sequelize.STRING
  }
}, {
  charset: 'utf8',
  collate: 'utf8_unicode_ci'
})
