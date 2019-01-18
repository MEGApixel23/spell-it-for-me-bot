const Sequelize = require('sequelize')

const db = require('./../services/Db')

module.exports = db.define('message', {
  telegramUserId: {
    type: Sequelize.STRING
  },
  raw: {
    type: Sequelize.JSON
  }
}, {
  charset: 'utf8',
  collate: 'utf8_unicode_ci'
})
