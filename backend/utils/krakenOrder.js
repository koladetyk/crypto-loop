const ccxt = require('ccxt');

async function placeKrakenFuturesOrder(asset, direction, entryPrice, riskAmount) {
    try {
        const krakenfutures = new ccxt.krakenfutures({
            apiKey: process.env.KRAKEN_API_KEY,
            secret: process.env.KRAKEN_API_SECRET,
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

module.exports = { placeKrakenFuturesOrder };
