require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const port = 3000;


const mongoDBUri = process.env.MONGODB_URI;
const stocksRoute = require('./routes/stocks');

app.set('view engine', 'ejs');
app.set('views', './views');

app.use(express.json());

// Enable CORS for requests from React
app.use(cors({
  origin: 'http://localhost:5173'
}));

app.use('/', stocksRoute);

app.use(express.urlencoded({ extended: true }));

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


