const { Pool } = require('pg');
require('dotenv').config();

const { DBPORT, USER, HOST, DBNAME, PASSWORD } = process.env;

// create an instance
const pool = new Pool({
  user: USER,
  password: PASSWORD,
  host: HOST,
  port: DBPORT,
  database: DBNAME,
  max: '5000',

});

module.exports = { pool };
