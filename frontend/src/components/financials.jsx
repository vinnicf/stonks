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
            <th></th>
          </tr>
        </thead>
        <tbody>
          {stock.financials.map((financial) => (
            <tr key={financial._id} className="financial">
              <td>{financial.year}</td>
              <td>${financial.receita.toLocaleString()}</td>
              <td>${financial.lucro.toLocaleString()}</td>
              <td>${financial.patrimonioLiquido.toLocaleString()}</td>
              <td>
                <button onClick={() => handleDeleteFinancial(stock._id, financial._id)}>X</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  )}