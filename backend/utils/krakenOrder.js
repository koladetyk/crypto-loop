const ccxt = require('ccxt');

async function placeKrakenFuturesOrder(asset, direction, entryPrice, riskAmount, apiKey, apiSecret) {
    try {
        const krakenfutures = new ccxt.krakenfutures({
            apiKey: apiKey,      
            secret: apiSecret,     
            enableRateLimit: true,
        });

        // Set sandbox mode to true for the demo environment
        krakenfutures.setSandboxMode(true);

        const symbol = asset;
        const amount = Math.max(parseInt(riskAmount), 1); // Ensure the amount is at least 1
        const price = entryPrice;
        const side = direction;
        const orderType = 'limit';

        const order = await krakenfutures.createOrder(symbol, orderType, side, amount, price);

        console.log('Order placed:', order);

        return order;
    } catch (error) {
        console.error('Error placing order:', error);
        throw error;
    }
}

// Function to save trade to blockchain
const saveTradeToBlockchain = async (trade) => {
    try {
        //const response = await axios.post('https://blockchain.example.com/saveTrade', { trade });
        return response.data;
    } catch (error) {
        console.error('Error saving trade to blockchain:', error);
        throw error;
    }
};

module.exports = { placeKrakenFuturesOrder };
