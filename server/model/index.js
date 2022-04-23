const { pool } = require('../db');

module.exports = {
  getProducts() {
      const querry = `SELECT * FROM public.products LIMIT 5`
    }
};