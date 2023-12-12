const mongoose = require('mongoose');
const Stonk = require('./models/stonks')
// Replace with your MongoDB connection string
const mongoDBUri = "mongodb+srv://vini:vmhGclrkIbiMxrfu@stocks.twgvyjc.mongodb.net/Stonks?retryWrites=true&w=majority";


mongoose.connect(mongoDBUri);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

const mockupStonks = [
  {
    name: 'Alpha Technologies',
    symbol: 'ALPH',
    price: 120,
    financials: [], // You can add mockup financials here if needed
  },
  {
    name: 'Beta Systems',
    symbol: 'BETA',
    price: 95,
    financials: [],
  },
  // ... more mockup stonks
];

Stonk.insertMany(mockupStonks)
  .then(() => {
    console.log('Mockup data added successfully');
    mongoose.connection.close();
  })
  .catch(err => {
    console.error('Error adding mockup data:', err);
    mongoose.connection.close();
  });
