module.exports = {
  up: (queryInterface, Sequelize) => (
    queryInterface.createTable('recognitions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      filename: {
        type: Sequelize.STRING
      },
      text: {
        type: Sequelize.TEXT
      },
      telegramUserId: {
        type: Sequelize.STRING
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
  down: queryInterface => queryInterface.dropTable('recognitions')
}
