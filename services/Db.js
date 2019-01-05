const Sequelize = require('sequelize')

const { mysql: { DB_USER, DB_PASS, DB_NAME, DB_HOST } } = require('./../config/config')

module.exports = new Sequelize(DB_NAME, DB_USER, DB_PASS, {
  host: DB_HOST,
  dialect: 'mysql',
  operatorsAliases: false,

  pool: {
    max: 50,
    min: 0,
    acquire: 30000,
    idle: 10000
  },

  define: {
    charset: 'utf8',
    collate: 'utf8_general_ci',
    timestamps: true
  }
})
