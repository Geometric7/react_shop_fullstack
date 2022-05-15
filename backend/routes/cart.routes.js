const express = require('express');
const router = express.Router();

const cart = require('../controllers/cart.controller');

router.post('/cart', cart.saveCart);
router.get('/cart', cart.getCart);

module.exports = router;
