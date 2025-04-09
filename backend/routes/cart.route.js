const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cart.controller');


router.post('/createCart',cartController.createCart);
router.get('/getCart',cartController.getCart);
router.post('/updateCart',cartController.updateCart);
router.post('/deleteFromCart',cartController.deleteFromCart);
router.post('/syncCart', async (req, res) => {
    try {
      const { userId, items } = req.body
      const cart = await Cart.findOneAndUpdate(
        { user: userId },
        { 
          $set: { 
            cartItems: items.map(item => ({
              serviceId: item.serviceId,
              quantity: item.quantity,
              price: item.price
            }))
          } 
        },
        { new: true, upsert: true }
      )
      res.status(200).json({ success: true, cart })
    } catch (error) {
      res.status(500).json({ success: false, error: 'Cart sync failed' })
    }
  })


module.exports = router;