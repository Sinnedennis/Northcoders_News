if (!process.env.NODE_ENV) process.env.NODE_ENV = 'dev';

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const config = require('./config');
const db = config.DB[process.env.NODE_ENV] || process.env.DB;
mongoose.Promise = Promise;

const APIRouter = require('./routers/APIRouter');

mongoose.connect(db, {useMongoClient: true})
  .then(() => console.log('successfully connected to', db)) // eslint-disable-line
  .catch(err => console.log('connection failed', err)); // eslint-disable-line

app.use(cors(), bodyParser.json());


// API Router
app.use('/api', APIRouter);

app.use('/', (req, res) => {
  res.status(200).send({message: 'Hello! This the backend API used in my Northcoders News project. Click the example links below to see the endpoints available'});
});

app.use('/*', (req, res) => {
  res.status(404).send({message: 'Page Not Found'});
});

//Error handling
app.use((err, req, res, next) => {
  if(err.type === 404) return res.status(404).send({message: 'Page not found'});
  next(err);
});

//Error handling
app.use((err, req, res) => {
  res.status(500).send({err});
});

module.exports = app;
