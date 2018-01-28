const Sequelize = require('sequelize')

// const Member = global.db.define('members', {
//   name: {
//     type: Sequelize.STRING,
//     allowNull: false
//   },
//   medium: {
//     type: Sequelize.STRING,
//     allowNull: false
//   },
//   updated_at: {
//     type: Sequelize.DATE
//   }
// })

module.exports = function (sequelize, DataTypes) {
  return sequelize.define('members', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    medium: {
      type: DataTypes.STRING,
      allowNull: false
    },
    updated_at: {
      type: Sequelize.DATE
    }
  })
}
