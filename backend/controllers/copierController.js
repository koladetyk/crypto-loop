const Copier = require('../models/Copier');
const Trade = require('../models/Trade');
const MasterTrader = require('../models/MasterTrader');
const { placeKrakenFuturesOrder } = require('../utils/krakenOrder'); 

// Function to register a copier
exports.registerCopier = async (req, res) => {
    const { name, apiKey, apiSecret, email, phone } = req.body;

    try {
        // Create a new copier with the provided data
        const newCopier = new Copier({
            name,
            apiKey,
            apiSecret,
            email,
            phone,
        });

        // Save the copier to the database
        await newCopier.save();

        res.status(201).json({ message: 'Copier registered successfully!' });
    } catch (error) {
        console.error('Error registering copier:', error);
        res.status(500).json({ message: 'Failed to register copier' });
    }
};

exports.followMasterTrader = async (req, res) => {
    const { masterTraderId, copierId } = req.body;

    try {
        const masterTrader = await MasterTrader.findById(masterTraderId);
        const copier = await Copier.findById(copierId);

        masterTrader.copiers.push(copier);
        copier.masterTrader = masterTrader;

        await masterTrader.save();
        await copier.save();

        res.status(200).json({ message: 'Copier added to master trader\'s list' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.setRiskManagementPlan = async (req, res) => {
    const { copierId, riskAmount } = req.body;

    try {
        // Find the copier by ID
        const copier = await Copier.findById(copierId);

        if (!copier) {
            throw new Error('Copier not found');
        }

        // Set the risk amount
        copier.riskAmount = riskAmount;

        // Save the updated copier back to the database
        await copier.save();

        res.status(200).json({ message: 'Risk management plan updated successfully', copier });
    } catch (error) {
        console.error('Error setting risk management plan:', error);
        res.status(500).json({ error: error.message });
    }
};

exports.copyTrades = async (req, res) => {
    const { masterTraderId } = req.body;

    try {
        // Find the Master Trader and populate copiers
        const masterTrader = await MasterTrader.findById(masterTraderId).populate('copiers');
        if (!masterTrader) {
            return res.status(404).json({ error: 'Master Trader not found' });
        }

        // Fetch all the trades for the master trader from the database
        const trades = await Trade.find({ masterTrader: masterTraderId });

        // Loop through each trade and each copier to place trades
        for (const trade of trades) {
            for (const copier of masterTrader.copiers) {
                try {
                    // Use the API key and secret
                    await placeKrakenFuturesOrder(trade.asset, trade.direction, trade.entryPrice, copier.riskAmount, copier.apiKey, copier.apiSecret);
                    console.log(`Trade placed for copier ${copier._id} with amount ${copier.riskAmount} for trade ${trade._id}`);
                } catch (error) {
                    console.error(`Failed to place trade for copier ${copier._id} for trade ${trade._id}:`, error.message);
                }
            }
        }

        res.status(200).json({ message: 'Trades successfully copied for all copiers' });
    } catch (error) {
        console.error('Error copying trades:', error);
        res.status(500).json({ error: error.message });
    }
};
