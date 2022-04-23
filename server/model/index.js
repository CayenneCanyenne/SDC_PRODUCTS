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
  getProductId(productId = 1) {
    // reference https://www.postgresql.org/docs/9.5/functions-json.html
    // great example here!: https://www.bigbinary.com/blog/generating-json-using-postgresql-json-function
    const query = `SELECT row_to_json(o)
     FROM (
        SELECT id, name, category, default_price,
          (
            SELECT array_to_json(array_agg(a))
            FROM (
              SELECT feature, value
              FROM public.features
              WHERE product_id = ${productId}
            ) a
          ) as features
        FROM public.products
        WHERE products.id = ${productId}
     ) o`;
    return pool.connect()
      .then((client) => client.query(query)
        .then((res) => {
          client.end();
          return res.rows[0].row_to_json;
        })
        .catch((err) => new Error(err)));
  },
};
