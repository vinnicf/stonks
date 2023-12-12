const mongoose = require('mongoose');


// Define the schema for the financial data
const financialYearSchema = new mongoose.Schema({
  year: {
    type: Number,
    required: true
  },
  receitaLiquida: {
    type: Number,
    required: true
  },
  receitaBruta: {
    type: Number,
    required: true
  },
  profit: {
    type: Number,
    required: true
  },
  patrimonioLiquido: {
    type: Number,
    required: true
  },
  ativo: {
    type: Number,
    required: true
  },
  acoesON: {
    type: Number,
    required: true
  },
  acoesPN: {
    type: Number,
    required: true
  },
  // Add other financial fields as needed
});



const stonkSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true
    },
    symbol: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true
    },

    financials: [financialYearSchema]
  });
  
  const Stonk = mongoose.model('Stonk', stonkSchema);

  module.exports = Stonk;