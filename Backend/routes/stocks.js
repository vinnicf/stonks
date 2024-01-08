
const express = require('express');
const Stonk = require('../models/stonks')
const router = express.Router();
const { calculateThreeYearPE, calculateTwoYearROE, rankStocksAndCalculateMagicNumber } = require('./indicators'); // Adjust the path if indicators.js is in a different folder

router.use(express.urlencoded({ extended: true }));


router.get('/stocks', (req, res) => {
    Stonk.find()
        .then(stonks => {
            const updatedStonks = stonks.map(stonk => {
                const peRatio = calculateThreeYearPE(stonk);
                const roe2 = calculateTwoYearROE(stonk);

                // Convert the Mongoose document to a plain JavaScript object and attach the P/E ratio
                const stonkObject = stonk.toObject();
                stonkObject.peRatio = peRatio;
                stonkObject.roe2 = roe2;

                return stonkObject;
            });
            const rankedStonks = rankStocksAndCalculateMagicNumber(updatedStonks);

            res.json(rankedStonks);
        })
        .catch(err => res.status(500).json({ error: err.message }));
});

router.get('/stocks-admin', (req, res) => {
    Stonk.find()
        .catch(err => res.status(500).json({ error: err.message }));
});

router.patch('/stocks/:id/financials', async (req, res) => {
    try {
        const stockId = req.params.id;
        const financialData = req.body;

        // Find the stock and update its financials array
        const stock = await Stonk.findById(stockId);
        if (!stock) {
            return res.status(404).send('Stock not found');
        }

        stock.financials.push(financialData);
        await stock.save();

        res.status(200).json(stock);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.patch('/stocks/:id', async (req, res) => {
    try {
        const stockId = req.params.id;
        const { price } = req.body; // Extract the new price from the request body

        // Find the stock and update its price
        const stock = await Stonk.findById(stockId);
        if (!stock) {
            return res.status(404).send('Stock not found');
        }

        stock.price = price;
        await stock.save();

        res.status(200).json(stock);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


router.delete('/stocks/:stockId/financials/:financialId', async (req, res) => {
    try {
        const { stockId, financialId } = req.params;

        // Find the stock and pull the financial entry from the financials array
        const result = await Stonk.findByIdAndUpdate(stockId, {
            $pull: { financials: { _id: financialId } }
        }, { new: true });

        if (!result) {
            return res.status(404).send('Stock or financial entry not found');
        }

        res.status(200).json(result);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});




router.get('/stocks/new', (req, res) => {
    res.render('addStock');
});


router.post('/stocks/add', (req, res) => {
    const { name, symbol, price } = req.body;

    const newStonk = new Stonk({
        name,
        symbol,
        price
    });

    newStonk.save()
        .then(() => res.redirect('/stocks'))
        .catch(err => res.status(500).send(err.message));
});



router.get('/stocks/:stockId/newfinancials', async (req, res) => {
    try {
        const stock = await Stonk.findById(req.params.stockId);
        if (!stock) {
            return res.status(404).send('Stock not found');
        }
        res.render('addFinancials', { stock });
    } catch (err) {
        res.status(500).send(err.message);
    }
});



router.post('/stocks/:stockId/addFinancials', (req, res) => {
    const stockId = req.params.stockId;
    const financialData = req.body;

    Stonk.findById(stockId)
        .then(stock => {
            if (!stock) {
                return res.status(404).send('Stock not found');
            }
            stock.financials.push(financialData);
            return stock.save();
        })
        .then(() => res.redirect('/stocks'))
        .catch(err => res.status(500).send(err.message));
});


module.exports = router;