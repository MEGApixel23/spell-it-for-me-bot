module.exports = {
  up: (queryInterface, Sequelize) => (
    queryInterface.addColumn('users', 'selectedLanguageCode', {
      allowNull: true,
      type: Sequelize.STRING
    })
  ),
  down: queryInterface => queryInterface.removeColumn('users', 'selectedLanguageCode')
}
