const dbConnect = require('./dbConnect')


// 取得所有產品
// exports.getAllEvents = () => {
//   return new Promise((resolve, reject) => {
//     dbConnect.query(
//       `
//       SELECT 
//       *
//       FROM events, eventimages 
//       WHERE events.eventid = eventimages.eventid
//       `, (err, events) => {
//       if (err) return reject(err)
//       resolve(events)
//     })
//   })
// }

// 取得單個產品
exports.getEvents = (id ,userId) => {

  return new Promise((resolve, reject) => {
    // console.log(userId)
    dbConnect.query(`
      SELECT
       * 
      FROM events , eventimages , users , ticketdetails
      WHERE events.eventid = ? 
      AND events.eventid = eventimages.eventid
      AND events.eventid = ticketdetails.eventid 


      `, [id, userId], (err, event) => {
      if (err) return reject(err)
      resolve(event)
      // res.send(event)
    })
  })
}
// AND userid = ?


// 新增產品
exports.createEvents = (eventData) => {
  return new Promise((resolve, reject) => {
    dbConnect.query('INSERT INTO events SET ?', eventData, (err, result) => {
      if (err) return reject(err)
      resolve({ message: 'events created', id: result.insertId })
    })
  })
}

// // 更新產品
// exports.updateEvents = (id, eventData) => {
//   return new Promise((resolve, reject) => {
//     dbConnect.query('UPDATE events SET ? WHERE eventid = ?', [eventData, id], (err, result) => {
//       if (err) return reject(err)
//       resolve({ message: 'events updated', changed: result.changedRows })
//     })
//   })
// }

// // 刪除產品
// exports.deleteEvents = (id) => {
//   return new Promise((resolve, reject) => {
//     dbConnect.query('DELETE FROM events WHERE eventid = ?', [id], (err, result) => {
//       if (err) return reject(err)
//       resolve({ message: 'events deleted', deleted: result.affectedRows })
//     })
//   })
// }
