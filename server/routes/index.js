const express = require('express');
const controller = require('../controller');

const router = express.Router();

router.get('/products', controller.getProducts);
router.get('/products:product_Id', controller.getProductId);

module.exports = router;
