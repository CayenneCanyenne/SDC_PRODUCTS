const { Pool } = require('pg');
require('dotenv').config({ path: '../.env' });

const { DBPORT, USER, HOST, DBNAME, PASSWORD } = process.env;
console.log(process.env.DBNAME);

// create an instance
const pool = new Pool({
  user: USER,
  password: PASSWORD,
  host: HOST,
  port: DBPORT,
  database: DBNAME,
  max: '10000',
  idleTimeoutMillis: '1000',

});

module.exports = { pool };
