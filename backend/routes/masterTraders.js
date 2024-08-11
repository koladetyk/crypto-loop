// routes/masterTraders.js

const express = require('express');
const router = express.Router();
const masterTraderController = require('../controllers/masterTraderController');

// Route to register a master trader
router.post('/registerMasterTrader', masterTraderController.registerMasterTrader);
router.post('/followMasterTrader', masterTraderController.followMasterTrader);

module.exports = router;
