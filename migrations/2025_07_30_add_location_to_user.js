
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('users', 'location', {
      type: Sequelize.GEOMETRY('POINT')
    });
    // Add spatial index
    await queryInterface.sequelize.query(
      'CREATE INDEX idx_users_location ON users USING GIST(location)'
    );
  },
  down: async (queryInterface) => {
    await queryInterface.removeColumn('users', 'location');
  }
};