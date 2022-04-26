const model = require('../model');

module.exports = {
  test(req, res) {
    model.test()
      .then((data) => {
        console.log('here is the data!', data);
        res.send(data);
        res.end();
      })
      .catch(() => new Error('Error in test at controller!'));
  },
  getProducts(req, res) {
    console.log(req);
    model.getProducts(req.query.page, req.query.count)
      .then((data) => {
        console.log('here is the data!', data);
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
