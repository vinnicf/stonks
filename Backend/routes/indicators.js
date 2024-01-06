// indicators.js
/**
 * Calculate the 3-year average P/E ratio for a stock.
 * @param {Object} stock - The stock object from the database.
 * @returns {number|null} - The calculated P/E ratio or null if not enough data.
 */
function calculateThreeYearPE(stock) {
    const relevantFinancials = stock.financials.filter(financial =>
        financial.year === 2022 || financial.year === 2021 || financial.year === 2020
    );

    if (relevantFinancials.length < 3) {
        // Not enough data to calculate the average
        return null;
    }

    const totalProfit = relevantFinancials.reduce((sum, record) => sum + record.lucro, 0);
    const averageProfit = totalProfit / relevantFinancials.length;

    // Ensure that averageProfit and acoesTotais are not zero to avoid division by zero
    if (averageProfit === 0 || stock.acoesTotais === 0) {
        return null;
    }

    const earningsPerShare = (averageProfit * 1000) / stock.acoesTotais;
    const peRatio = (stock.price / 100) / earningsPerShare;

    const formattedPERatio = peRatio !== null ? parseFloat(peRatio.toFixed(2)) : null;

    return formattedPERatio;
}

/**
 * Calculate the 2-year average ROE for a stock.
 * @param {Object} stock - The stock object from the database.
 * @returns {number|null} - The calculated average ROE or null if not enough data.
 */

function calculateTwoYearROE(stock) {
    // Create a map for quick access to equity by year
    const equityByYear = stock.financials.reduce((acc, financial) => {
        acc[financial.year] = financial.patrimonioLiquido;
        return acc;
    }, {});

    let roe2022, roe2021;

    // Find the lucro for 2022 and the patrimonioLiquido for 2021
    const financial2022 = stock.financials.find(financial => financial.year === 2022);
    if (financial2022 && equityByYear[2021]) {
        roe2022 = financial2022.lucro / equityByYear[2021];
    }

    // Find the lucro for 2021 and the patrimonioLiquido for 2020
    const financial2021 = stock.financials.find(financial => financial.year === 2021);
    if (financial2021 && equityByYear[2020]) {
        roe2021 = financial2021.lucro / equityByYear[2020];
    }

    // Ensure we have both ROEs to calculate the average
    if (roe2022 != null && roe2021 != null) {
        const averageROE = (roe2022 + roe2021) / 2;
        return parseFloat(averageROE.toFixed(2)); // Format to 2 decimal places
    } else {
        return null; // Not enough data to calculate average ROE
    }
}


/**
 * Ranks stocks based on their P/E ratio and ROE, and calculates a 'magic number'.
 * @param {Array} stocks - An array of stock objects.
 * @returns {Array} - The array of stocks with their magic number and updated rankings.
 */
function rankStocksAndCalculateMagicNumber(stocks) {
    const rankByMetric = (key, ascending = true) => {
        const validStocks = stocks.filter(stock => stock[key] !== null && stock[key] >= 0);
        return validStocks
            .sort((a, b) => ascending ? a[key] - b[key] : b[key] - a[key])
            .reduce((acc, stock, index) => {
                acc[stock._id] = index + 1; // Rank starts from 1
                return acc;
            }, {});
    };

    const peRanks = rankByMetric('peRatio');
    const roeRanks = rankByMetric('roe2', false);

    return stocks.map(stock => {
        const peRank = peRanks[stock._id] || Infinity;
        const roeRank = roeRanks[stock._id] || Infinity;
        const magicNumber = peRank + roeRank;

        return { ...stock, magicNumber };
    }).sort((a, b) => a.magicNumber - b.magicNumber);
}



module.exports = {
    calculateThreeYearPE,
    calculateTwoYearROE,
    rankStocksAndCalculateMagicNumber,
};
