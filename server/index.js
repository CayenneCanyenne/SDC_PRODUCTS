// dependencies
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const app = express();

// middleware
app.use(bodyParser.json());
app.use(bodyParser.json());
app.use(morgan);
app.use(express.urlencoded({ extended: false }));
app.use(express.json());


const PORT = 3000;
app.listen(PORT, () => {
  console.log(`server connected to port: ${PORT}`);
});
