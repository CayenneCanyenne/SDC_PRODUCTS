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
  getProductId(productId = 300) {
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
  getProductStyles(productId = 200) {
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
              FROM skus
              WHERE skus.styleId = styles.id
          )
          FROM public.styles
          WHERE styles.productId = ${productId}
        ) b
      ) AS results
      FROM public.products
      WHERE products.id = ${productId}
    ) a`;
    return pool.connect()
      .then((client) => client.query(query)
        .then((res) => {
          client.end();
          return res.rows[0].row_to_json;
        })
        .catch((err) => new Error(err)));
  },
  test(page = 1, count = 10) {
    const query = `SELECT
    products.id,
    styles.id, styles.original_price, styles.sale_price, styles.default_style,
    photos.url, photos.thumbnail_url
    FROM public.products
    INNER JOIN public.styles
    ON public.products.id = public.styles.productId
    AND public.products.id = 4
    INNER JOIN public.photos
    ON public.photos.styleid = public.styles.id
    INNER JOIN public.skus
    ON public.skus.styleid = public.styles.id`;
    return pool.connect()
      .then((client) => client.query(query)
        .then((res) => {
          client.end();
          return res.rows;
        })
        .catch((err) => new Error(err)));
  },
};

//https://www.post