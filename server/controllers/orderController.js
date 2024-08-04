const dbConnect = require('../models/dbConnect')

exports.getOrderDetails = (req, res) => {
  dbConnect.query('SELECT * FROM OrderDetails WHERE odid=?', [req.params.odid], (err, result) => {
    if (err) throw err
    // console.log(result)
    res.send(result)
  })
}
