const { Pool } = require('pg');
require('dotenv').config();

const {DBPORT, DBNAME, USER, HOST, PASSWORD } = process.env;
// create an instance
// need to use enviroment variabls
const pool = new Pool({
  user: USER,
  password: PASSWORD,
  host: HOST,
  port: DBPORT,
  database: DBNAME,
  max: '30',
});

module.exports = { pool };
