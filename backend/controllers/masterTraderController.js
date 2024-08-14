// controllers/masterTraderController.js

const MasterTrader = require('../models/MasterTrader'); // Import the MasterTrader model
const Copier = require('../models/Copier');
const Trade = require('../models/Trade');  


exports.followMasterTrader = async (req, res) => {
    const { masterTraderId, copierId } = req.body;

    try {
        // Find the Master Trader
        const masterTrader = await MasterTrader.findById(masterTraderId);
        if (!masterTrader) {
            return res.status(404).json({ error: 'Master Trader not found' });
        }

        // Find the Copier
        const copier = await Copier.findById(copierId);
        if (!copier) {
            return res.status(404).json({ error: 'Copier not found' });
        }

        // Check if the copier already follows the master trader
        if (masterTrader.copiers.includes(copier._id)) {
            return res.status(400).json({ error: 'Copier already follows this Master Trader' });
        }

        // Add the copier to the master trader's list of copiers
        masterTrader.copiers.push(copier._id);
        await masterTrader.save();

        // Add the master trader reference to the copier's document
        copier.masterTrader = masterTrader._id;
        await copier.save();

        res.status(200).json({ message: 'Copier successfully followed Master Trader', masterTrader });
    } catch (error) {
        console.error('Error following Master Trader:', error);
        res.status(500).json({ error: error.message });
    }
};


// Function to register a master trader
exports.registerMasterTrader = async (req, res) => {
    const { name, accountSize, email, phone } = req.body;

    try {
        // Create a new master trader document
        const newMasterTrader = new MasterTrader({
            name,
            accountSize,
            email,
            phone,
        });

        // Save the master trader to the database
        await newMasterTrader.save();

        // Respond with success message
        res.status(201).json({ message: 'Master trader registered successfully!' });
    } catch (error) {
        console.error('Error registering master trader:', error);
        res.status(500).json({ message: 'Failed to register master trader' });
    }
};

exports.getAllMasterTraders = async (req, res) => {
    try {
      const masterTraders = await MasterTrader.find().populate('copiers').exec();
      const tradersWithTradeCount = await Promise.all(masterTraders.map(async trader => {
        const tradeCount = await Trade.countDocuments({ masterTrader: trader._id });
        return {
          ...trader.toObject(),
          tradeCount,
          copierCount: trader.copiers.length
        };
      }));
      res.status(200).json(tradersWithTradeCount);
    } catch (error) {
      console.error('Error fetching master traders:', error);
      res.status(500).json({ error: 'Failed to fetch master traders' });
    }
  };
  
