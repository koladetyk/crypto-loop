require('dotenv').config();
const axios = require('axios');
const crypto = require('crypto');

// Function to place a trade on Kraken Futures Demo Environment
const placeTradeOnKraken = async (asset, direction, entryPrice, riskAmount) => {
    const apiKey = process.env.KRAKEN_API_KEY;
    const apiSecret = process.env.KRAKEN_API_SECRET;
    const apiPath = '/derivatives/api/v3/sendorder';
    const nonce = Date.now().toString(); // Nonce as a string

    const postData = {
        symbol: asset,
        side: direction,
        orderType: 'limit',
        size: riskAmount,
        limitPrice: entryPrice,
    };

    const postDataString = new URLSearchParams(postData).toString();
    const secretBuffer = Buffer.from(apiSecret, 'base64');
    const hash = crypto.createHash('sha256');
    const hmac = crypto.createHmac('sha512', secretBuffer);

    const message = postDataString + nonce + apiPath; 
    const hashDigest = hash.update(message).digest();
    const hmacDigest = hmac.update(hashDigest).digest('base64');

    console.log('Message:', message);
    console.log('Hash Digest:', hashDigest.toString('base64'));
    console.log('HMAC Digest:', hmacDigest);
    
    const headers = {
        'API-Key': apiKey,
        'Nonce': nonce,
        'Authent': hmacDigest,
        'Content-Type': 'application/x-www-form-urlencoded'
    };

    console.log('Request Headers:', headers);
    console.log('Request Body:', postDataString);

    try {
        const response = await axios.post(`https://demo-futures.kraken.com${apiPath}`, postDataString, { headers });
        return response.data;
    } catch (error) {
        console.error('Error placing trade on Kraken:', error.response ? error.response.data : error.message);
        throw error;
    }
};

// Function to save trade to blockchain
const saveTradeToBlockchain = async (trade) => {
    try {
        const response = await axios.post('https://blockchain.example.com/saveTrade', { trade });
        return response.data;
    } catch (error) {
        console.error('Error saving trade to blockchain:', error);
        throw error;
    }
};

module.exports = {
    placeTradeOnKraken,
    saveTradeToBlockchain
};
