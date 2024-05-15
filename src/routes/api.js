const express = require('express');

const apiRoutes = (pool) => {
    const router = express.Router();

    router.get('/tickers', async (req, res) => {
        try {
            const result = await pool.query('SELECT * FROM tickers');
            res.json(result.rows);
        } catch (error) {
            console.error('Error fetching data from the database:', error);
            res.status(500).send('Server error');
        }
    });

    return router;
};

module.exports = apiRoutes;
