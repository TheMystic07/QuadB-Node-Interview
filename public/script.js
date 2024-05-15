// public/script.js

document.addEventListener('DOMContentLoaded', async () => {
    try {
        const response = await fetch('/api/tickers');
        const data = await response.json();

        const tableBody = document.getElementById('ticker-table');
        data.forEach((ticker, index) => {
            const row = document.createElement('tr');

            row.innerHTML = `
                <td>${index + 1}</td>
                <td>${ticker.name}</td>
                <td>₹${ticker.last}</td>
                <td>₹${ticker.buy} / ₹${ticker.sell}</td>
                <td>${ticker.volume}</td>
                <td>${ticker.base_unit}</td>
            `;

            tableBody.appendChild(row);
        });
    } catch (error) {
        console.error('Error fetching tickers:', error);
    }

    try {
        const response = await fetch('/api/tickers');
        const data = await response.json();

        // Calculate the best price to trade (average of buy and sell prices of the top ticker)
        if (data.length > 0) {
            const bestPriceTicker = data[0];
            const bestPrice = (parseFloat(bestPriceTicker.buy) + parseFloat(bestPriceTicker.sell)) / 2;
            document.getElementById('best-price').textContent = bestPrice.toFixed(2);
        }
    } catch (error) {
        console.error('Error fetching tickers:', error);
    }

});


