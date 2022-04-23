// dependencies
const express = require('express');
const morgan = require('morgan');
const products = require('./routes');

const app = express();

// middleware
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// use the routes to handle endpoints
app.use(products);


const PORT = 3000;
app.listen(PORT, () => {
  console.log(`server connected to port: ${PORT}`);
});
