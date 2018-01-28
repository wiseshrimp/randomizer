const debug = require('debug')('sql')
const chalk = require('chalk')
const Sequelize = require('sequelize')
const Promise = require('bluebird')
const { Client } = require('pg')

const dbName = 'pilates'
const url = `postgres://localhost:5432/${dbName}`

console.log(chalk.yellow(`Opening database connection to ${url}`));

var db

if (process.env.DATABASE_URL) {
  db = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    protocol: 'postgress',
    port: match[4],
    host: match[3],
    logging: true
  })
} else {
  db = new Sequelize(url, {
    logging: debug,
    native: true,
    define: {
      underscored: true,
      freezeTableName: true,
      timestamps: true
    }
  })
}

const Member = db.define('members', {
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

module.exports = db
