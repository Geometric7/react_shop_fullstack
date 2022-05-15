const express = require('express');
const router = express.Router();

const variant = require('../controllers/variant.controller');

router.get('/variant', variant.getAll);

module.exports = router;
