const Sequelize = require('sequelize')

const Member = global.db.define('members', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  medium: {
    type: Sequelize.STRING,
    allowNull: false
  },
  updated_at: {
    type: Sequelize.DATE
  }
})

module.exports = Member
