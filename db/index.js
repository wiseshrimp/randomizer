const debug = require('debug')('sql')
const chalk = require('chalk')
const Sequelize = require('sequelize')
const Promise = require('bluebird')
const { Client } = require('pg')

const dbName = 'pilates'
// const url = `postgres://localhost:5432/${dbName}`

var sequelize

if (process.env.HEROKU_POSTGRESQL_COBALT_URL) {
  sequelize = new Sequelize(process.env.HEROKU_POSTGRESQL_COBALT_URL, {
    dialect: 'postgres',
    protocol: 'postgres',
    logging: true
  })
} else {
  sequelize = new Sequelize(`postgres://localhost:5432/${name}`, {
    logging: debug,
    define: {
      underscored: true,
      freezeTableName: true,
      timestamps: true
    }
  })
}

const db = global.db = {
  Sequelize: Sequelize,
  sequelize: sequelize,
  User: sequelize.import(__dirname + '/models/Member')
}

// const url = process.env.DATABASE_URL || `postgres://localhost:5432/${name}`

// const db = new Sequelize(`postgres://localhost:5432/${name}`, {
//   logging: debug,
//   define: {
//     underscored: true,
//     freezeTableName: true,
//     timestamps: true
//   }
// })


// const Member = db.define('members', {
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

module.exports = db
