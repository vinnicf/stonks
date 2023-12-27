const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const port = 3000;


const mongoDBUri = "mongodb+srv://vini:vmhGclrkIbiMxrfu@stocks.twgvyjc.mongodb.net/Stonks?retryWrites=true&w=majority";
const stocksRoute = require('./routes/stocks');

app.set('view engine', 'ejs');
app.set('views', './views');



// Enable CORS for requests from React
app.use(cors({
  origin: 'http://localhost:5173'
}));

app.use('/', stocksRoute);

// Serve static files from the "public" directory
app.use(express.static('public'));


mongoose.connect(mongoDBUri);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));




app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});


