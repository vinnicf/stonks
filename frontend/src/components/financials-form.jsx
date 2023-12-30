import React from 'react';


function FinancialForm({ stockId, handleAddFinancial }) {
    return (
        <form onSubmit={(e) => handleAddFinancial(e, stock._id)} className="financial-form">
            <div className="form-field">
                <label htmlFor="year">Ano</label>
                <input type="number" placeholder="Year" name="year" />
            </div>
            <div className="form-field">
                <label htmlFor="receitaBruta">Receita Bruta</label>
                <input type="number" placeholder="Gross Revenue" name="receitaBruta" />
            </div>
            <div className="form-field">
                <label htmlFor="receitaLiquida">Receita Liq.</label>
                <input type="number" placeholder="Net Revenue" name="receitaLiquida" />
            </div>

            <div className="form-field">
                <label htmlFor="profit">Lucro</label>
                <input type="number" placeholder="Profit" name="profit" />
            </div>
            <div className="form-field">
                <label htmlFor="patrimonioLiquido">Patrimônio Líquido</label>
                <input type="number" placeholder="Net Equity" name="patrimonioLiquido" />
            </div>
            <div className="form-field">
                <label htmlFor="ativo">Ativo</label>
                <input type="number" placeholder="Assets" name="ativo" />
            </div>
            <div className="form-field">
                <label htmlFor="acoesON">Ações ON</label>
                <input type="number" placeholder="Common Shares" name="acoesON" />
            </div>
            <div className="form-field">
                <label htmlFor="acoesPN">Ações PN</label>
                <input type="number" placeholder="Preferred Shares" name="acoesPN" />
            </div>
            <button type="submit" className="submit-button">Enviar</button>
        </form>
    );
}

export default FinancialForm;