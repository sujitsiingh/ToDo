const express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
const dbConnect = require('./config/db');


// Set up Global configuration access
require('dotenv').config();
dbConnect();

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('Server is running...');
});

// Import routes

// Listening to the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`----- Server running on port ${PORT} --------`);
});