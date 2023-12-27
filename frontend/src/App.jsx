import './App.css'
import React, { useEffect, useState } from 'react';
import fetchStocks from './api/apis';

function App() {
  const [stocks, setStocks] = useState([]);

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

  return (
    <div className="stock-container">
    {stocks.length === 0 ? (
      <p className="no-stocks">No stocks available</p>
    ) : (
      stocks.map((stock) => (
        <div key={stock._id} className="stock">
          <h3 className="stock-name">{stock.name} ({stock.symbol})</h3>
          <p className="stock-price">Price: ${stock.price.toLocaleString()}</p>
          {stock.financials.length > 0 && (
            <div className="financials">
              <h4>Financials</h4>
              <ul>
                {stock.financials.map((financial) => (
                  <li key={financial._id} className="financial">
                    <p><strong>Year:</strong> {financial.year}</p>
                    <p><strong>Revenue:</strong> ${financial.receitaLiquida.toLocaleString()}</p>
                    <p><strong>Profit:</strong> ${financial.profit.toLocaleString()}</p>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      ))
    )}
  </div>
  );
}

export default App
