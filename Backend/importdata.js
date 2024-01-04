require('dotenv').config();
const mongoose = require('mongoose');
const Stonk = require('./models/stonks')
const fs = require('fs');

const mongoDBUri = process.env.MONGODB_URI;

mongoose.connect(mongoDBUri);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// Load the JSON data
const companiesData = JSON.parse(fs.readFileSync('../data/companies.json', 'utf8'));

// Filter out companies without a ticker
const validCompanies = companiesData.filter(company => company.ticker);


// Transform the data to match the schema
const transformedData = validCompanies.map(company => {
  const financialData = company.financials ? Object.keys(company.financials).map(year => {
    const financialYear = {
      year: parseInt(year),
      receita: company.financials[year].receitaLiquida,
      lucro: company.financials[year].lucro,
      patrimonioLiquido: company.financials[year].patrimonioLiquido,
      ativo: company.financials[year].ativoTotal,
    };

    // Log if lucro is missing
    if (financialYear.lucro === undefined) {
      console.log(`Missing 'lucro' for company: ${company.Denominacao}, Year: ${year}`);
    }

    return financialYear;
  }) : [];

    // Log if price is missing
    if (company.preco === undefined) {
      console.log(`Missing 'price' for company: ${company.Denominacao}`);
    }

  return {
    name: company.Denominacao,
    ticker: company.ticker,
    price: company.preco,
    acoesTotais: company.numeroAcoes,
    financials: financialData,
  };
});


// Insert the data into MongoDB
Stonk.insertMany(transformedData)
  .then(() => {
    console.log('Data added successfully');
    mongoose.connection.close();
  })
  .catch(err => {
    console.error('Error adding data:', err);
    mongoose.connection.close();
  });