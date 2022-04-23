const { pool } = require('../db');

// will need to checkout a client for each request
// reference to docs https://node-postgres.com/features/pooling


module.exports = {
  getProducts(page = 1, count = 10) {
    const offset = count * (page - 1);
    const query = `SELECT * FROM public.products LIMIT ${count} OFFSET ${offset}`;
    return pool.connect()
      .then((client) => client.query(query)
        .then((res) => {
          client.end();
          return res.rows;
        })
        .catch((err) => new Error('Error in getProducts!')));
  },
};
