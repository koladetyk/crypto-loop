// models/MasterTrader.js

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MasterTraderSchema = new Schema({
    name: { type: String, required: true },
    accountSize: { type: Number, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    copiers: [{ type: Schema.Types.ObjectId, ref: 'Copier' }]
});

module.exports = mongoose.model('MasterTrader', MasterTraderSchema);
