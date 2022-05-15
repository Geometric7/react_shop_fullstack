const express = require('express');
const router = express.Router();

const order = require('../controllers/order.controller');

router.post('/order', order.sendOrder);

module.exports = router;
