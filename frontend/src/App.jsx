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
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });

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


  const sortStocks = (key) => {
    // Toggle sort direction or set to 'ascending' if a new key is selected
    const direction = sortConfig.key === key && sortConfig.direction === 'ascending' ? 'descending' : 'ascending';

    const sortedStocks = [...stocks].sort((a, b) => {
      if (a[key] < b[key]) {
        return direction === 'ascending' ? -1 : 1;
      }
      if (a[key] > b[key]) {
        return direction === 'ascending' ? 1 : -1;
      }
      return 0;
    });

    setStocks(sortedStocks);
    setSortConfig({ key, direction });
  };


  // Function to render the sort indicator
  const renderSortArrow = (key) => {
    if (sortConfig.key === key) {
      return sortConfig.direction === 'ascending' ? ' 🔼' : ' 🔽';
    }
    return '';
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
              <th onClick={() => sortStocks('ticker')}>Ticker{renderSortArrow('ticker')}</th>
              <th onClick={() => sortStocks('name')}>Nome{renderSortArrow('name')}</th>
              <th onClick={() => sortStocks('price')}>Preço{renderSortArrow('price')}</th>
              <th onClick={() => sortStocks('peRatio')}>P/L 3 anos{renderSortArrow('peRatio')}</th>
              <th onClick={() => sortStocks('roe2')}>ROE 2 anos{renderSortArrow('roe2')}</th>


            </tr>
          </thead>
          <tbody>
            {stocks.map((stock) => (
              <tr key={stock._id} >
                <td>{stock.ticker}</td>
                <td>{stock.name} </td>
                <td>R${(stock.price / 100).toLocaleString()}</td>
                <td>{stock.peRatio}</td>
                <td>{(stock.roe2 * 100).toLocaleString()} %</td>

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
