async function getStockData() {
    const stockSymbol = document.getElementById('stockSymbol').value.toUpperCase();
    if (!stockSymbol) {
        alert("Please enter a valid stock symbol.");
        return;
    }

    // Fetch data from Yahoo Finance API using RapidAPI
    try {
        const response = await fetch(`https://yfapi.net/v6/finance/quote?region=US&lang=en&symbols=${stockSymbol}`, {
            method: 'GET',
            headers: {
                'x-api-key': '74b6bf7fb2msh0916a63dcaea7cdp108839jsn2c40a1fc5b80' // Replace this with your Yahoo Finance API key from RapidAPI
            }
        });
        const data = await response.json();
        const stock = data.quoteResponse.result[0];

        document.getElementById('stockName').textContent = `Stock Name: ${stock.longName}`;
        document.getElementById('stockPrice').textContent = `Current Price: $${stock.regularMarketPrice}`;
        document.getElementById('stockChange').textContent = `Change: ${stock.regularMarketChangePercent.toFixed(2)}%`;

        // Store the current price for calculation purposes
        document.getElementById('stockPrice').dataset.price = stock.regularMarketPrice;
    } catch (error) {
        alert("Error fetching stock data. Please check your network or API key.");
        console.error(error);
    }
}

function calculateInvestment() {
    const investmentAmount = parseFloat(document.getElementById('investmentAmount').value);
    const currentPrice = parseFloat(document.getElementById('stockPrice').dataset.price);

    if (isNaN(investmentAmount) || isNaN(currentPrice)) {
        alert("Please enter a valid investment amount and fetch stock data.");
        return;
    }

    const quantity = investmentAmount / currentPrice;
    const profitOrLoss = (currentPrice - investmentAmount) * quantity;
    document.getElementById('profitOrLoss').textContent = `Estimated Profit/Loss: $${profitOrLoss.toFixed(2)}`;
}

