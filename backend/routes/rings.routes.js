const express = require('express');
const router = express.Router();

const ring = require('../controllers/rings.controller');

router.get('/rings', ring.getAll);
router.get('/ring/:id', ring.getById);

module.exports = router;
