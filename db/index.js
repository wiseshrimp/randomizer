const debug = require('debug')('sql')
const chalk = require('chalk')
const Sequelize = require('sequelize')
const Promise = require('bluebird')
const { Client } = require('pg')

const dbName = 'pilates'

var sequelize

if (process.env.HEROKU_POSTGRESQL_COBALT_URL) {
  sequelize = new Sequelize(process.env.HEROKU_POSTGRESQL_COBALT_URL, {
    dialect: 'postgres',
    protocol: 'postgres',
    logging: true
  })
} else {
  sequelize = new Sequelize(`postgres://localhost:5432/${dbName}`, {
    logging: debug,
    define: {
      underscored: true,
      freezeTableName: true,
      timestamps: true
    }
  })
}
const Member = sequelize.define('members', {
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

Member.sync()

const db = global.db = {
  Sequelize: Sequelize,
  sequelize: sequelize
}

module.exports = db
