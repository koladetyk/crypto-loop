// routes/copiers.js

const express = require('express');
const router = express.Router();
const copierController = require('../controllers/copierController');

router.post('/registerCopier', copierController.registerCopier);
router.post('/followMasterTrader', copierController.followMasterTrader);
router.post('/setRiskManagementPlan', copierController.setRiskManagementPlan);
router.post('/copyTrades', copierController.copyTrades);

module.exports = router;
