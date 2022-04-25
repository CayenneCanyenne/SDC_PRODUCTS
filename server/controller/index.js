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
    model.getProducts()
      .then((data) => {
        console.log('here is the data!', data);
        res.send(data);
        res.end();
      })
      .catch(() => new Error('Error in getProducts at controller!'));
  },
  getProductId(req, res) {
    model.getProductId()
      .then((data) => {
        res.send(data);
        res.end();
      })
      .catch(() => new Error('Error in getProductId at controller!'));
  },
  getProductStyles(req, res) {
    model.getProductStyles()
      .then((data) => {
        res.send(data);
        res.end();
      })
      .catch(() => new Error('Error in getProductId at controller!'));
  },
  getRelated(req, res) {
    model.getRelated()
      .then((data) => {
        res.send(data);
        res.end();
      })
      .catch(() => new Error('Error in getProductId at controller!'));
  },
};
