const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cart.controller');


router.post('/createCart',cartController.createCart);
router.get('/getCart',cartController.getCart);

module.exports = router;