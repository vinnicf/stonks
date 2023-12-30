import './App.css'
import './styles/stonks.css'
import React, { useEffect, useState } from 'react';
import fetchStocks from './api/apis';
import { updateFinancialData } from './api/apis';

function App() {
  const [stocks, setStocks] = useState([]);
  const [openFormStockId, setOpenFormStockId] = useState(null);

  useEffect(() => {
    const getStocks = async () => {
      try {
        const data = await fetchStocks();
        setStocks(data);
      } catch (error) {
        console.error(error);
      }
    };

    getStocks();
  }, []);

  // Function to handle form submit
  const handleAddFinancial = async (e, stockId) => {
    e.preventDefault();
    const financialData = {
      year: e.target.year.value,
      receitaLiquida: e.target.receitaLiquida.value,
      receitaBruta: e.target.receitaBruta.value,
      profit: e.target.profit.value,
      patrimonioLiquido: e.target.patrimonioLiquido.value,
      ativo: e.target.ativo.value,
      acoesON: e.target.acoesON.value,
      acoesPN: e.target.acoesPN.value,
    };

    console.log('Submitting financial data:', financialData);


    try {
      const updatedStock = await updateFinancialData(stockId, financialData);
      setStocks(stocks.map(stock => stock._id === stockId ? updatedStock : stock));
      setOpenFormStockId(null);
    } catch (error) {
      console.error('Failed to add financial data:', error);
    }
  };

  return (
    <div className="stock-container">
      {stocks.length === 0 ? (
        <p className="no-stocks">No stocks available</p>
      ) : (
        stocks.map((stock) => (
          <div key={stock._id} className="stock">
            <h3 className="stock-name">{stock.name} ({stock.symbol})</h3>
            <p className="stock-price">Preço: R${stock.price.toLocaleString()}</p>
            {stock.financials.length > 0 && (
              <div className="financials">
                <h4>Financials</h4>
                <table className='width-table'>
                  <thead>
                    <tr>
                      <th>Ano</th>
                      <th>Faturamento</th>
                      <th>Lucro</th>
                      <th>Patrimônio Liq.</th>
                    </tr>
                  </thead>
                  <tbody>
                    {stock.financials.map((financial) => (
                      <tr key={financial._id} className="financial">
                        <td>{financial.year}</td>
                        <td>${financial.receitaLiquida.toLocaleString()}</td>
                        <td>${financial.profit.toLocaleString()}</td>
                        <td>${financial.patrimonioLiquido.toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <button onClick={() => setOpenFormStockId(stock._id)}>
                  Add Financial Data
                </button>
                {openFormStockId === stock._id && (
                  <form onSubmit={(e) => handleAddFinancial(e, stock._id)} className="financial-form">
                    <div className="form-field">
                      <label htmlFor="year">Year</label>
                      <input type="number" placeholder="Year" name="year" />
                    </div>
                    <div className="form-field">
                      <label htmlFor="receitaLiquida">Net Revenue</label>
                      <input type="number" placeholder="Net Revenue" name="receitaLiquida" />
                    </div>
                    <div className="form-field">
                      <label htmlFor="receitaBruta">Gross Revenue</label>
                      <input type="number" placeholder="Gross Revenue" name="receitaBruta" />
                    </div>
                    <div className="form-field">
                      <label htmlFor="profit">Profit</label>
                      <input type="number" placeholder="Profit" name="profit" />
                    </div>
                    <div className="form-field">
                      <label htmlFor="patrimonioLiquido">Net Equity</label>
                      <input type="number" placeholder="Net Equity" name="patrimonioLiquido" />
                    </div>
                    <div className="form-field">
                      <label htmlFor="ativo">Assets</label>
                      <input type="number" placeholder="Assets" name="ativo" />
                    </div>
                    <div className="form-field">
                      <label htmlFor="acoesON">Common Shares</label>
                      <input type="number" placeholder="Common Shares" name="acoesON" />
                    </div>
                    <div className="form-field">
                      <label htmlFor="acoesPN">Preferred Shares</label>
                      <input type="number" placeholder="Preferred Shares" name="acoesPN" />
                    </div>
                    <button type="submit" className="submit-button">Enviar</button>
                  </form>
                )}
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
}

export default App;
