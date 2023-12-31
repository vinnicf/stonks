import React, { useState } from 'react';


function FinancialForm({ stockId, onFinancialSubmit }) {

    const [year, setYear] = useState('');
    const [grossRevenue, setGrossRevenue] = useState('');
    const [netRevenue, setNetRevenue] = useState('');
    const [profit, setProfit] = useState('');
    const [netEquity, setNetEquity] = useState('');
    const [assets, setAssets] = useState('');
    const [commonShares, setCommonShares] = useState('');
    const [preferredShares, setPreferredShares] = useState('');

    const formatNumber = (value) => {
        // Convert to string and remove non-digit characters
        value = value.toString().replace(/\D/g, '');
        // Add thousand separators
        return value.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    };

    const handleInputChange = (e, setValue) => {
        const { value } = e.target;
        setValue(formatNumber(value));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const financialData = {
            year: parseInt(year.replace(/\./g, ''), 10),
            receitaBruta: parseInt(grossRevenue.replace(/\./g, ''), 10),
            receitaLiquida: parseInt(netRevenue.replace(/\./g, ''), 10),
            profit: parseInt(profit.replace(/\./g, ''), 10),
            patrimonioLiquido: parseInt(netEquity.replace(/\./g, ''), 10),
            ativo: parseInt(assets.replace(/\./g, ''), 10),
            acoesON: parseInt(commonShares.replace(/\./g, ''), 10),
            acoesPN: parseInt(preferredShares.replace(/\./g, ''), 10),
        };

        Object.keys(financialData).forEach(key => {
            if (isNaN(financialData[key])) {
                financialData[key] = 0; // Or handle as required for your application
            }
        });

        // Log the data being sent to the server
        console.log("Data being sent to the server:", financialData);


        onFinancialSubmit(financialData, stockId);
    };


    return (
        <form onSubmit={handleSubmit} className="financial-form">
            <div className="form-field">
                <label htmlFor="year">Ano</label>
                <input type="text" placeholder="Year" value={year} name="year" onChange={(e) => handleInputChange(e, setYear)} />
            </div>
            <div className="form-field">
                <label htmlFor="receitaBruta">Receita Bruta</label>
                <input type="text" placeholder="Gross Revenue" value={grossRevenue} name="receitaBruta" onChange={(e) => handleInputChange(e, setGrossRevenue)} />
            </div>
            <div className="form-field">
                <label htmlFor="receitaLiquida">Receita Liq.</label>
                <input type="text" placeholder="Net Revenue" value={netRevenue} name="receitaLiquida" onChange={(e) => handleInputChange(e, setNetRevenue)} />
            </div>

            <div className="form-field">
                <label htmlFor="profit">Lucro</label>
                <input type="text" placeholder="Profit" value={profit} name="profit" onChange={(e) => handleInputChange(e, setProfit)} />
            </div>
            <div className="form-field">
                <label htmlFor="patrimonioLiquido">Patrimônio Líquido</label>
                <input type="text" placeholder="Net Equity" value={netEquity} name="patrimonioLiquido" onChange={(e) => handleInputChange(e, setNetEquity)} />
            </div>
            <div className="form-field">
                <label htmlFor="ativo">Ativo</label>
                <input type="text" placeholder="Assets" value={assets} name="ativo" onChange={(e) => handleInputChange(e, setAssets)} />
            </div>
            <div className="form-field">
                <label htmlFor="acoesON">Ações ON</label>
                <input type="text" placeholder="Common Shares" value={commonShares} name="acoesON" onChange={(e) => handleInputChange(e, setCommonShares)} />
            </div>
            <div className="form-field">
                <label htmlFor="acoesPN">Ações PN</label>
                <input type="text" placeholder="Preferred Shares" value={preferredShares} name="acoesPN" onChange={(e) => handleInputChange(e, setPreferredShares)} />
            </div>
            <button type="submit" className="submit-button">Enviar</button>
        </form>
    );
}

export default FinancialForm;