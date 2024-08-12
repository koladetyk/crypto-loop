// models/Copier.js

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CopierSchema = new Schema({
    name: { type: String, required: true },
    apiKey: { type: String, required: true },
    apiSecret: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    riskAmount: { type: Number, default: 0 },
    masterTrader: { type: Schema.Types.ObjectId, ref: 'MasterTrader' }
});

module.exports = mongoose.model('Copier', CopierSchema);
