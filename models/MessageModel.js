const Sequelize = require('sequelize')

const db = require('./../services/Db')

module.exports = db.define('message', {
  telegramUserId: {
    type: Sequelize.STRING
  },
  raw: {
    type: Sequelize.JSON
  }
})
