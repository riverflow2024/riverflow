const mysql = require('mysql')
let con = mysql.createConnection({
  host: 'localhost',
  user: 'chusers',
  password: '123456',
})

con.connect(function (err) {
  if (err) throw err
  console.log('Connected!')
})
