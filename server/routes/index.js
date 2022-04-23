const express = require('express');
const controller = require('../controller');

const router = express.Router();

router.get('/products', controller.getProducts);

// router.route('/:product_id').get(( req, res) => {

// });

// router.route('/:product_id/styles').get(( req, res) => {

// });

// router.route('/:product_id/related').get(( req, res) => {

// });

module.exports = router;
