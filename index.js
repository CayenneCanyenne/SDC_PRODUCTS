// reference docs https://node-postgres.com/

const {Pool, Client} = require('pg');

const pool = new Pool({
  host: 'localhost',
  user: 'pscha',
  database: 'SDC',
  port: 5432
});

