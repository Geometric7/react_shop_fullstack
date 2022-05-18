const express = require('express');
const router = express.Router();

const option = require('../controllers/option.controller');

router.get('/option', option.getAll);

module.exports = router;
