const { Pool } = require('pg');
require('dotenv').config();

const { DBPORT, USER, HOST } = process.env;
// create an instance
// need to use enviroment variabls
const pool = new Pool({
  user: USER,
  password: 'postgres',
  host: HOST,
  port: DBPORT,
  database: 'postgres',
  max: '30',
});

module.exports = { pool };
