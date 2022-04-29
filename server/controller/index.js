const NodeCache = require('node-cache');
const model = require('../model');

const stylesCache = new NodeCache();

module.exports = {
  test(req, res) {
    res.send('Success in TEST Model!').send(200);
  },
  getProducts(req, res) {
    model.getProducts(req.query.page, req.query.count)
      .then((data) => {
        res.status(200).json(data);
      })
      .catch(() => new Error('Error in getProducts at controller!'));
  },
  getProductId(req, res) {
    model.getProductId(req.params.product_id)
      .then((data) => {
        res.status(200).json(data);
      })
      .catch(() => new Error('Error in getProductId at controller!'));
  },
  getProductStyles(req, res) {
    const { product_id } = req.params;
    const inCache = stylesCache.has(product_id);
    return inCache ? stylesCache.get(product_id) : model.getProductStyles(product_id)
      .then((data) => {
        res.status(200).json(data);
      })
      .catch(() => new Error('Error in getProductStyles at controller!'));
  },
  getRelated(req, res) {
    model.getRelated(req.params.product_id)
      .then((data) => {
        res.status(200).json(data);
      })
      .catch(() => new Error('Error in getRelated at controller!'));
  },
};
