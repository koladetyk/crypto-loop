// app.js

require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const config = require('./config');
const tradeRoutes = require('./routes/trades');
const copiersRoutes = require('./routes/copiers');
const masterTraderRoutes = require('./routes/masterTraders');

const app = express();

mongoose.connect(config.dbUri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

app.use(bodyParser.json());
// Middleware to parse incoming requests with JSON payloads
//app.use(express.json());

app.use('/api/trades', tradeRoutes);
app.use('/api/copiers', copiersRoutes);
app.use('/api/masterTraders', masterTraderRoutes);

const PORT = process.env.PORT || 5005;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
