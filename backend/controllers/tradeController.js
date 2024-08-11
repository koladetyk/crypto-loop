const mongoose = require('mongoose');
const { ObjectId } = mongoose.Types;
const Trade = require('../models/Trade');
const MasterTrader = require('../models/MasterTrader');
const Copier = require('../models/Copier');
const { placeKrakenFuturesOrder } = require('../utils/krakenOrder');

exports.placeTrade = async (req, res) => {
    const { asset, entryPrice, stopLossPrice, takeProfitPrice, direction, masterTraderId } = req.body;

    try {
        // Convert masterTraderId to ObjectId
        const masterTraderObjectId = new ObjectId(masterTraderId);

        // Place the trade on Kraken
        const orderResult = await placeKrakenFuturesOrder(asset, direction, entryPrice, 1); 

        // Create a new Trade document and save it to MongoDB
        const trade = new Trade({
            asset,
            entryPrice,
            stopLossPrice,
            takeProfitPrice,
            direction,
            masterTrader: masterTraderObjectId,
            orderId: orderResult.id,
            timestamp: orderResult.timestamp,
            symbol: orderResult.symbol,
            quantity: orderResult.amount,
            filled: orderResult.filled,
            limitPrice: orderResult.price,
        });
        await trade.save();

        // Find the MasterTrader and loop through the copiers
        const masterTrader = await MasterTrader.findById(masterTraderObjectId).populate('copiers');

        if (!masterTrader) {
            throw new Error('MasterTrader not found');
        }

        for (const copier of masterTrader.copiers) {
            // Place the same trade on Kraken for each copier
            await placeKrakenFuturesOrder(asset, direction, entryPrice, copier.riskAmount);
        }

        res.status(200).json(trade);
    } catch (error) {
        console.error('Error placing trade:', error);
        res.status(500).json({ error: error.message });
    }
};
