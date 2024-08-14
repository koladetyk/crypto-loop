// app.js

require('dotenv').config();
const cors = require('cors');
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

app.use(cors({
    origin: 'http://localhost:5173', 
    methods: ['GET', 'POST', 'PUT', 'DELETE'], 
    credentials: true 
}));

app.use('/api/trades', tradeRoutes);
app.use('/api/copiers', copiersRoutes);
app.use('/api/masterTraders', masterTraderRoutes);


const PORT = process.env.PORT || 5005;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
