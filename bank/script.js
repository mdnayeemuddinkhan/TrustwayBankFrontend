// Function for navigation to other pages
function navigateTo(page) {
    window.location.href = page;
}

// Function to fetch gold price from goldapi.io
async function fetchGoldPrice() {
    const url = 'https://www.goldapi.io/api/XAU/USD';
    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'x-access-token': 'goldapi-edjwsm3k3ldrf-io' // Replace with your GoldAPI key
            }
        });

        // Check if the response is valid
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        console.log(data);  // Debugging to check what the data looks like
        const goldPrice = data.price; // The actual price is under 'price'
        document.getElementById('gold-price').innerText = `$${goldPrice}`;
    } catch (error) {
        console.error('Error fetching gold price:', error);
        document.getElementById('gold-price').innerText = "Error fetching gold price.";
    }
}

// Function to fetch live stock price from Alpha Vantage
async function fetchStockPrice() {
    const stockSymbol = "GOOG";  // Example: Google stock symbol
    const apiKey = "D1O6BHIMQUQFEBN9";  // Replace with your Alpha Vantage API Key
    const url = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${stockSymbol}&interval=5min&apikey=${apiKey}`;

    try {
        const response = await fetch(url);
        // Check if the response is valid
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        console.log(data);  // Debugging to check what the data looks like

        const latestData = data["Time Series (5min)"];
        if (latestData) {
            const lastTime = Object.keys(latestData)[0];
            const stockPrice = latestData[lastTime]["1. open"]; // Stock price at that timestamp
            document.getElementById('stock-price').innerText = `${stockSymbol}: $${stockPrice}`;
        } else {
            document.getElementById('stock-price').innerText = "Data unavailable";
        }
    } catch (error) {
        console.error('Error fetching stock price:', error);
        document.getElementById('stock-price').innerText = "Error fetching stock price.";
    }
}

// Call the functions on page load
window.onload = function() {
    fetchGoldPrice();
    fetchStockPrice();
};
