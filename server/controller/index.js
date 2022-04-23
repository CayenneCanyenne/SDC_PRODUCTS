const model = require('../model');

module.exports = {
  test(req, res) {
    console.log('router is working!');
    res.end();
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
};
