const express = require('express');
const controller = require('../controller');

const router = express.Router();

router.get('/products', controller.getProducts);
router.get('/products/:product_id', controller.getProductId);
router.get('/products/:product_id/styles', controller.getProductStyles);

module.exports = router;
