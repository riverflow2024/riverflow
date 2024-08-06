const express = require('express')
const router = express.Router()

// 假設這些控制器函數已經定義

const {
  getAllEvents,
  getEventsById,
  createEvents,
  updateEvents,
  deleteEvents,
} = require('../controllers/eventTobuyController')

//新增
router.post('/', createEvents)
//更新
router.put('/:id', updateEvents)
//刪除
router.delete('/:id', deleteEvents)
//取全部
router.get('/', getAllEvents)
//取單個
router.get('/:id', getEventsById)

module.exports = router
