const dbConnect = require('./dbConnect')
const bcrypt = require('bcryptjs')

// 根據ID查詢用戶
const getUser = async (id) => {
  const [rows] = await dbConnect.query('SELECT * FROM users WHERE userid = ? AND valid = TRUE', [id])
  return rows[0]
}

// 新增用戶
const createUser = async (userData) => {
  const { email, password, firstName, lastName, sex, phone, valid } = userData
  const hashedPassword = await bcrypt.hash(password, 12)
  const [result] = await dbConnect.query(
    'INSERT INTO Users (email, secret, firstName, lastName, sex, phone, valid) VALUES (?, ?, ?, ?, ?, ?, ?)',
    [email, hashedPassword, firstName, lastName, sex, phone, valid]
  )
  return getUser(result.insertId)
}

// 更新用戶
const updateUserById = async (id, userData) => {
  const fields = []
  const values = []

  if (userData.name) {
    fields.push('name = ?')
    values.push(userData.name)
  }

  if (userData.email) {
    fields.push('email = ?')
    values.push(userData.email)
  }

  if (userData.photo) {
    fields.push('photo = ?')
    values.push(userData.photo)
  }

  if (userData.password) {
    const hashedPassword = await bcrypt.hash(userData.password, 12)
    fields.push('password = ?')
    values.push(hashedPassword)
  }

  values.push(id)

  const query = `UPDATE users SET ${fields.join(', ')} WHERE id = ? AND valid = TRUE`
  await dbConnect.query(query, values)
  return getUser(id)
}

// 刪除用戶（軟刪除）
const deleteUserById = async (id) => {
  await dbConnect.query('UPDATE users SET valid = FALSE WHERE id = ?', [id])
}

module.exports = {
  getUser,
  createUser,
  updateUserById,
  deleteUserById
}
