const express = require('express');
const router = express.Router();
const tradeController = require('../controllers/tradeController');

router.post('/placeTrade', tradeController.placeTrade);

module.exports = router;
