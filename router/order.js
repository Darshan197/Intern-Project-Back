const express = require('express')
const router = express.Router()
const OrderController = require('../controllers/OrderController')

router.post('/', OrderController.CreateOrder)
router.get('/', OrderController.getOrders)
router.get('/:id', OrderController.getOrder)

module.exports = router