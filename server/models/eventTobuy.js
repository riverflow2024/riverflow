const dbConnect = require('./dbConnect')


// 取得所有產品
exports.getAllEvents = () => {
  return new Promise((resolve, reject) => {
    dbConnect.query(
      `
      SELECT * 
      FROM events,ticketdetails,user 
      WHERE events.eventid = ticketdetails.eventid
      AND events.userid = user.userid
      `, (err, events) => {
      if (err) return reject(err)
      resolve(events)
    })
  })
}

// 取得單個產品
exports.getEvents = (id, userId) => {
  return new Promise((resolve, reject) => {
    dbConnect.query('SELECT * FROM events, Users WHERE eventid = ? AND userid = ?', [id, userId], (err, event) => {
      if (err) return reject(err)
      resolve(event[0])
      // res.send(event)
    })
  })
}

// 新增產品
exports.createEvents = (eventData) => {
  const payTime = new Date();
  return new Promise((resolve, reject) => {
    dbConnect.query(
      `
      INSERT INTO ticketdetails (userid, eventid, ticketType, quantity, tdStatus, price, payTime, receiptType, receiptInfo) 
      SELECT *
      FROM
      events, Users ,ticketdetails
      WHERE ticketdetails.userid = users.userid 
      AND ticketdetails.eventid = events.eventid

      `
      , [], (err, result) => {
      if (err) return reject(err)
      resolve({ message: 'events created', id: result.insertId })
    })
  })
}

// 更新產品
exports.updateEvents = (id, eventData) => {
  return new Promise((resolve, reject) => {
    dbConnect.query('UPDATE events SET ? WHERE eventid = ?', [eventData, id], (err, result) => {
      if (err) return reject(err)
      resolve({ message: 'events updated', changed: result.changedRows })
    })
  })
}

// 刪除產品
exports.deleteEvents = (id) => {
  return new Promise((resolve, reject) => {
    dbConnect.query('DELETE FROM events WHERE eventid = ?', [id], (err, result) => {
      if (err) return reject(err)
      resolve({ message: 'events deleted', deleted: result.affectedRows })
    })
  })
}

//--------------------------------------------------------------------------------------------------------------------

//取得
// exports.getevent = (req,res) =>{
//     dbConnect.query('SELECT * FROM events WHERE eventid = ?',[req.params.id],(err, event) =>{
//         if(err) throw err
//         res.send(event)
//     })
// }

// exports.getAllevent = (req,res) =>{
//     dbConnect.query('SELECT * FROM events',(err, events) =>{
//         if(err) throw err
//         res.send(events)
//     })
// }

// //新增
// exports.createevent = (req,res) =>{
//     dbConnect.query('INSERT INTO events SET?',req.body,(err, result) =>{
//         if(err) throw err
//         res.send({message: 'event created', id: result.insertId})
//     })
// }

// //更新
// exports.updateevent = (req,res) =>{
//     dbConnect.query('UPDATE events SET? WHERE eventid =?',[req.body, req.params.id],(err, result) =>{
//         if(err) throw err
//         res.send({message: 'event updated', changed: result.changedRows})
//     })
// }

// //刪除
// exports.deleteevent = (req,res) =>{
//     dbConnect.query('DELETE FROM events WHERE eventid =?',[req.params.id],(err, result) =>{
//         if(err) throw err
//         res.send({message: 'event deleted', deleted: result.affectedRows})
//     })
// }
