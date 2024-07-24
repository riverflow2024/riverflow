const dbConnect = require('./dbConnect')
const express = require('express')
const app = express()

dbConnect.connect((err) => {
  if (err) throw err
  console.log('Connected to the database')
})

exports.getUser = app.get('/user/:id', function (req, res) {
  dbConnect.query('SELECT * FROM users WHERE userid = ?', [req.params.id], (err, result) => {
    if (err) throw err
    console.log(result)
    res.send(result)
  })
})
