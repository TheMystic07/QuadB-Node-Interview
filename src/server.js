const express = require('express');
const { Pool } = require('pg');
const axios = require('axios');
const apiRoutes = require('./routes/api');

const app = express();
const port = 3000;

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'crypto',
    password: '1',
    port: 5432,
});

app.use(express.json());

// Fetch data from WazirX API and store it in the database
const fetchAndStoreData = async () => {
    try {
        const response = await axios.get('https://api.wazirx.com/api/v2/tickers');
        const tickers = response.data;
        const topTickers = Object.values(tickers).slice(0, 10);

        await pool.query('TRUNCATE TABLE tickers'); // Clear previous data

        topTickers.forEach(async ticker => {
            const { name, last, buy, sell, volume, base_unit } = ticker;
            await pool.query(
                'INSERT INTO tickers (name, last, buy, sell, volume, base_unit) VALUES ($1, $2, $3, $4, $5, $6)',
                [name, last, buy, sell, volume, base_unit]
            );
        });
    } catch (error) {
        console.error('Error fetching data from WazirX API:', error);
    }
};

setInterval(fetchAndStoreData, 600000);
fetchAndStoreData();

app.use('/api', apiRoutes(pool));
app.use(express.static('public'));


app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
