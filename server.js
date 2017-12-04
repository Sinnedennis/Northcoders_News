if (!process.env.NODE_ENV) process.env.NODE_ENV = 'dev';

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
const config = require('./config');
const db = config.DB[process.env.NODE_ENV] || process.env.DB;
mongoose.Promise = Promise;

const APIRouter = require('./routers/APIRouter')

mongoose.connect(db, {useMongoClient: true})
  .then(() => console.log('successfully connected to', db))
  .catch(err => console.log('connection failed', err));

app.use(bodyParser.json());

// API Router
app.use('/api', APIRouter);


app.use('/*', (req, res, next) => {
  res.status(404).send({message: 'Page Not Found'})
})

//Error handling
app.use((err, req, res, next) => {
  if(err.type === 404) return res.status(404).send({message: 'Page not found'})
  next(err);
})

//Error handling
app.use((err, req, res, next) => {
  res.status(500).send({err})
})

module.exports = app;
