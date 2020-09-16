const express = require('express');
const app = express();
const path = require('path');
const port = 3000
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const mongodb = require('./db/mongodb.js');

// default mongoose connection
var mongoDB = 'mongodb://127.0.0.1';
mongoose.connect(mongoDB, { useNewUrlParser: true});

// get default connection
const db = mongoose.connection;

// bind connection to err event
db.on('error', console.error.bind(console,'MongoDB connection error:'));

app.use('/', express.static(path.join(__dirname, 'public')))

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
})