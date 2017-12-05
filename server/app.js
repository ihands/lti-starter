const express = require('express');
const morgan = require('morgan');
const path = require('path');

// The Firebase Admin SDK to access the Firebase Realtime Database. 
//const admin = require('firebase-admin');
//var serviceAccount = require("./service-account.json");

// Load configuration
const config = require('./config');
var model = require('./model');

//admin.initializeApp({
//  credential: admin.credential.cert(serviceAccount),
//  databaseURL: config.data.databaseURL
//});

const app = express();
//var db = admin.database();

// Setup logger
app.use(morgan(':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] :response-time ms'));

// Serve static assets
app.use(express.static(path.resolve(__dirname, '..', 'build')));

// Always return the main index.html, so react-router render the route in the client
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '..', 'build', 'index.html'));
});

app.post('/api', (req, res) => {
  res.send("Backend API");
});

module.exports = app;