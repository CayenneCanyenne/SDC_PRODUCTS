// dependencies
const express = require('express');
//const morgan = require('morgan');
const products = require('./routes');

const app = express();

// middleware
//app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// use the routes to handle endpoints
app.use(products);

// create a route for serverio
const loaderIoUrl = '/loaderio-3a29069b26f647aa5accd4f94aa0935e';
app.get(loaderIoUrl, (req, res) => {
  const file = '/home/ubuntu/SDC_PRODUCTS/loaderio-3a29069b26f647aa5accd4f94aa0935e.txt';
  res.sendFile(file);
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`server connected to port: ${PORT}`);
});
