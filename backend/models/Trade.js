const mongoose = require('mongoose');

const TradeSchema = new mongoose.Schema({
    asset: String,
    entryPrice: Number,
    stopLossPrice: Number,
    takeProfitPrice: Number,
    direction: String,
    masterTrader: { type: mongoose.Schema.Types.ObjectId, ref: 'MasterTrader' },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Trade', TradeSchema);
