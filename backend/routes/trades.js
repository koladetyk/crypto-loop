const express = require('express');
const router = express.Router();
const tradeController = require('../controllers/tradeController');

router.post('/saveTrade', tradeController.saveTrade);
router.get('/getTradesByMasterTraderId/:masterTraderId', tradeController.getTradesByMasterTraderId);

module.exports = router;
