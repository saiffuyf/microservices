const express = require('express');
const router = express.Router();
const { placeOrder, getOrders } = require('../controllers/orderController');

router.post('/place', placeOrder);
router.get('/', getOrders);

module.exports = router;
