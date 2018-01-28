const debug = require('debug')('sql')
const chalk = require('chalk')
const Sequelize = require('sequelize')
const Promise = require('bluebird')
const { Client } = require('pg')

const dbName = 'pilates'
// const url = `postgres://localhost:5432/${dbName}`

const url = process.env.DATABASE_URL || `postgres://localhost:5432/${name}`

const db = new Sequelize(url, {
  logging: debug,
  define: {
    underscored: true,
    freezeTableName: true,
    timestamps: true
  }
})


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
