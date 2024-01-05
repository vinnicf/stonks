import './App.css'
import './styles/stonks.css'
import React, { useEffect, useState } from 'react';
import fetchStocks from './api/apis';
import FinancialForm from './components/financials-form';
import { updateFinancialData, deleteFinancialData, updateStockPrice } from './api/apis';

function App() {
  const [stocks, setStocks] = useState([]);
  const [openFormStockId, setOpenFormStockId] = useState(null);
  const [selectedStock, setSelectedStock] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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
  const handleFinancialDataSubmit = async (financialData, stockId) => {
    try {
      const updatedStock = await updateFinancialData(stockId, financialData);
      setStocks(stocks.map(stock => stock._id === stockId ? updatedStock : stock));
      setOpenFormStockId(null);
    } catch (error) {
      console.error('Failed to add financial data:', error);
    }
  };

  const handlePriceClick = async (stockId, currentPrice) => {
    const newPrice = prompt("Enter new price:", currentPrice);
    if (newPrice && !isNaN(newPrice)) {
      const updatedStock = await updateStockPrice(stockId, newPrice);
      setStocks(stocks.map(stock => stock._id === stockId ? updatedStock : stock));
    }
  };

  const handleDeleteFinancial = async (stockId, financialId) => {

    const userConfirmed = window.confirm("Are you sure you want to delete this financial entry?");

    if (userConfirmed) {
      try {
        await deleteFinancialData(stockId, financialId);
        setStocks(stocks.map(stock => {
          if (stock._id === stockId) {
            const updatedFinancials = stock.financials.filter(financial => financial._id !== financialId);
            return { ...stock, financials: updatedFinancials };
          }
          return stock;
        }));
      } catch (error) {
        console.error('Failed to delete financial data:', error);
      }
    }
  };

  const handleStockClick = (stock) => {
    setSelectedStock(stock);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedStock(null);
  };

  return (
    <div className="stock-container">
      {stocks.length === 0 ? (
        <p className="no-stocks">No stocks available</p>
      ) : (
        <table className="stock-table">
          <thead>
            <tr>
              <th>Ticker</th>
              <th>Nome</th>
              <th>Preço</th>
              <th>P/L 3 anos</th>
              <th>ROE 2 anos</th>

              {/* Add other headers as needed */}
            </tr>
          </thead>
          <tbody>
            {stocks.map((stock) => (
              <tr key={stock._id} >
                <td>{stock.ticker}</td>
                <td>{stock.name} </td>
                <td>R${(stock.price / 100).toLocaleString()}</td>
                <td>{stock.peRatio}</td>
                <td>{stock.roe2}</td>
                {/* Add other stock data as needed */}
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {isModalOpen && selectedStock && (
        <FinancialModal
          stock={selectedStock}
          onClose={closeModal}
        />
      )}
    </div>
  );
}

export default App;
