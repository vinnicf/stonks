const mongoose = require('mongoose');


// Define the schema for the financial data
const financialYearSchema = new mongoose.Schema({
  year: {
    type: Number,
    required: true
  },
  receita: {
    type: Number,
    required: true
  },
  lucro: {
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
});


const stonkSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true
    },
    ticker: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true
    },
    acoesTotais: {
      type: Number,
      required: false
    },

    financials: [financialYearSchema]
  });
  
  const Stonk = mongoose.model('Stonk', stonkSchema);

  module.exports = Stonk;