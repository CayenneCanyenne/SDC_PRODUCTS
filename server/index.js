// dependencies
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const products = require('./routes');

const app = express();

// middleware
app.use(bodyParser.json());
app.use(bodyParser.json());
app.use(morgan('default'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// use the routes to handle endpoints
app.use(products);


const PORT = 3000;
app.listen(PORT, () => {
  console.log(`server connected to port: ${PORT}`);
});
