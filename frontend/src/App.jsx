import './App.css'
import './styles/stonks.css'
import React, { useEffect, useState } from 'react';
import fetchStocks from './api/apis';

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
  const handleAddFinancial = (e, stockId) => {
    e.preventDefault();
    // Gather your form data here
    // ...

    // Call your API to add financial data
    // ...

    // Close the form
    setOpenFormStockId(null);
  };

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
                <table>
                  <thead>
                    <tr>
                      <th>Year</th>
                      <th>Revenue</th>
                      <th>Profit</th>
                    </tr>
                  </thead>
                  <tbody>
                    {stock.financials.map((financial) => (
                      <tr key={financial._id} className="financial">
                        <td>{financial.year}</td>
                        <td>${financial.receitaLiquida.toLocaleString()}</td>
                        <td>${financial.profit.toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <button onClick={() => setOpenFormStockId(stock._id)}>
                  Add Financial Data
                </button>
                {openFormStockId === stock._id && (
                  <form onSubmit={(e) => handleAddFinancial(e, stock._id)}>
                    <input type="number" placeholder="Year" name="year" />
                    <input type="number" placeholder="Revenue" name="receitaLiquida" />
                    <input type="number" placeholder="Profit" name="profit" />
                    {/* Add other fields as necessary */}
                    <button type="submit">Enviar</button>
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
