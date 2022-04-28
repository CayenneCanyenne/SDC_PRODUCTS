const { pool } = require('../db');

// will need to checkout a client for each request
// reference to docs https://node-postgres.com/features/pooling

module.exports = {
  getProducts(page = 1, count = 5) {
    const offset = count * (page - 1);
    const query = 'SELECT * FROM public.products LIMIT $1 OFFSET $2';
    return pool.query(query, [count, offset])
      .then((res) => res.rows)
      .catch(() => new Error('Error in getProducts!'));
  },
  getProductId(productId) {
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
              WHERE product_id = $1
            ) a
          ) as features
        FROM public.products
        WHERE products.id = $1
     ) o`;
    return pool.query(query, [productId])
      .then((res) => res.rows[0].row_to_json)
      .catch((err) => new Error(err));
  },
  getProductStyles(productId) {
    const query = `SELECT row_to_json(a)
    FROM (
      SELECT id,
      (
        SELECT array_to_json(array_agg(b))
        FROM (
          SELECT id, name, original_price, sale_price, default_style,
          (
            SELECT array_to_json(array_agg(c))
            FROM (
              SELECT thumbnail_url, url
              FROM public.photos
              WHERE photos.styleId = styles.id
            ) c
          ) AS photos,
          (
            SELECT json_object_agg(skus.id,
              json_build_object('quantity', skus.quantity, 'size', skus.size)) AS skus
              FROM public.skus
              WHERE skus.styleId = styles.id
          )
          FROM public.styles
          WHERE styles.productId = $1
        ) b
      ) AS results
      FROM public.products
      WHERE products.id = $1
    ) a`;
    return pool.query(query, [productId])
      .then((res) => res.rows[0].row_to_json)
      .catch((err) => new Error(err));
  },
  getRelated(productId) {
    const query = `SELECT array_agg(related.related_product_id) AS array
    FROM public.related
    WHERE related.current_product_id = $1`;
    return pool.query(query, [productId])
      .then((res) => res.rows[0].array)
      .catch((err) => new Error(err));
  },
  test() {
    const query = 'test';
    return pool.connect()
      .then((client) => client.query(query)
        .then((res) => {
          client.end();
          return res.rows;
        })
        .catch((err) => new Error(err)));
  },
};
