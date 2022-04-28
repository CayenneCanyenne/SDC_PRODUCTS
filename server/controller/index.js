const model = require('../model');

module.exports = {
  test(req, res) {
    res.send('Success in TEST Model!').send(200);
  },
  getProducts(req, res) {
    model.getProducts(req.query.page, req.query.count)
      .then((data) => {
        res.send(data);
        res.end();
      })
      .catch(() => new Error('Error in getProducts at controller!'));
  },
  getProductId(req, res) {
    model.getProductId(req.params.product_id)
      .then((data) => {
        res.send(data);
        res.end();
      })
      .catch(() => new Error('Error in getProductId at controller!'));
  },
  getProductStyles(req, res) {
    model.getProductStyles(req.params.product_id)
      .then((data) => {
        res.send(data);
        res.end();
      })
      .catch(() => new Error('Error in getProductStyles at controller!'));
  },
  getRelated(req, res) {
    model.getRelated(req.params.product_id)
      .then((data) => {
        res.send(data);
        res.end();
      })
      .catch(() => new Error('Error in getRelated at controller!'));
  },
};
