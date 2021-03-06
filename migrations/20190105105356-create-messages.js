module.exports = {
  up: (queryInterface, Sequelize) => (
    queryInterface.createTable('messages', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      telegramUserId: {
        type: Sequelize.STRING
      },
      raw: {
        type: Sequelize.JSON
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    }, {
      charset: 'utf8',
      collate: 'utf8_unicode_ci'
    })
  ),
  down: (queryInterface) => queryInterface.dropTable('messages')
}
