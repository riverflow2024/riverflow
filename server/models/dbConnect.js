const dotenv = require('dotenv')
dotenv.config({ path: '../../config.env' })

const mysql = require('mysql')
const dbConnect = mysql.createConnection({
  user: process.env.DB_ACCOUNT,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME
})

dbConnect.connect((err) => {
  if (err) {
    console.error('Database connect failed:', err)
  } else {
    console.log('Database connection established')
  }
})

module.exports = dbConnect
