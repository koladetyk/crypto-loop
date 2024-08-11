const express = require('express');
const router = express.Router();
const tradeController = require('../controllers/tradeController');

router.post('/testTrade', tradeController.placeTrade);

module.exports = router;
