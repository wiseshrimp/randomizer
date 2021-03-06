const express = require('express')
const router = express.Router()
const db = require('../../db')
const Member = db.sequelize.models.members

const success = {response: 'success'}

router
  .get('/', function (req, res, next) {
    Member.findAll()
    .then(function(members) {
      res.status(200)
      res.send({
        data: members
      })
      next()
    })
    .catch(err => {
      console.log(err)
    })
  })
  .delete('/', function (req, res, next) {
    Member.destroy({
      where: {
        name: req.body.name
      }
    })
    .then(response => {
      res.send(success)
      next()
    })
    .catch(err => {
      console.log(err)
    })
  })
  .post('/', function (req, res) {
    let { name, medium } = req.body
    Member.build({
      name,
      medium
    })
    .save()
    .catch(function (err) {
      console.error(err)
    })
  })
  .put('/', function (req, res, next) {
    let { name, medium } = req.body
    Member.findOne({
      where: { name }
    })
    .then(member => {
      member.updateAttributes({
        medium
      })
      res.send(success)
      next()
    })
    .catch(err => {
      console.log(err)
    })
  })


module.exports = router
 